import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Stack,
  TextInput,
  NativeSelect,
  PasswordInput,
  Button,
  Anchor,
  Input,
} from "@mantine/core";
import { CurrentLocation, X } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import logoColor from "./../assets/svg/logo-color.svg";
import { Link, useNavigate } from "react-router-dom";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
const apiKey = process.env.REACT_APP_CH_GM_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  const address = {
    city: "",
    state: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};

const Register = () => {
  const searchInput = useRef(null);
  const [address, setAddress] = useState({});

  ls.config.encrypt = true;
  ls.config.secret = "secret-string";

  ls.config.encrypter = (data, secret) =>
    AES.encrypt(JSON.stringify(data), secret).toString();

  ls.config.decrypter = (data, secret) => {
    try {
      return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
    } catch (e) {
      return data;
    }
  };
  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        searchInput.current.value = _address.plain();
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  const form = useForm({
    initialValues: {
      artistName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Beatmaker",
    },
    validate: {
      artistName: (value) =>
        /^[a-zA-ZÀ-ÿ\s]{1,}$/.test(value)
          ? null
          : "El nombre debe contener al menos una letra",
      email: (value) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
          ? null
          : "Ingresa un email válido",
      password: (value) =>
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)
          ? null
          : "La contraseña debe contener mínimo 8 carácteres y al menos una letra mayúscula, una letra minúscula y un número",
      confirmPassword: (value, values) =>
        value !== values.password ? "Las contraseñas no coinciden" : null,
    },
  });

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    const { artistName, email, role, password } = form.values;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL_BACK}/users/register`,
        {
          artistName: artistName,
          email: email,
          role: role,
          location: `${address.city}, ${address.country}`,
          password: password,
          bio: "Cuéntanos un poco sobre ti...",
          links: ["", "", "", ""],
        }
      );
      localStorage.setItem("token", res.data.data.token);
      ls.set("name", res.data.data.artistName);
      ls.set("email", res.data.data.email);
      ls.set("picture", res.data.data.picture);
      ls.set("role", res.data.data.role);
      ls.set("location", res.data.data.location);
      ls.set("bio", res.data.data.bio);
      ls.set("links", JSON.stringify(res.data.data.links));
      const token = await localStorage.getItem("token");
      if (token) {
        nav("/profile");
      }
    } catch (e) {
      showNotification({
        disallowClose: true,
        title: "¡Oye!",
        message: "Ya hay un usuario registrado con ese correo",
        color: "red",
        icon: <X />,
        loading: false,
      });
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <Card shadow="lg">
          <Stack spacing="md">
            <Link to="/">
              <img
                src={logoColor}
                alt="Dímelo"
                width="110"
                className="logo-color"
              />
            </Link>
            <form
              className="form-wrapper"
              onSubmit={form.onSubmit(handleSubmit)}
            >
              <TextInput
                placeholder="Tu nombre"
                label="Nombre artístico"
                {...form.getInputProps("artistName")}
                required
              />
              <TextInput
                placeholder="Tu correo"
                label="Email"
                required
                {...form.getInputProps("email")}
              />
              <NativeSelect
                data={["Beatmaker", "Compositor"]}
                label="Escoge tu rol en la industria"
                required
                {...form.getInputProps("role")}
              />
              <Input
                label="¿Dónde vives?"
                placeholder="Ubicación"
                icon={<CurrentLocation />}
                ref={searchInput}
                required
              />

              <PasswordInput
                placeholder="Contraseña"
                label="Contraseña"
                description="Tu contraseña debe incluir 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
                {...form.getInputProps("password")}
                required
              />
              <PasswordInput
                placeholder="Contraseña"
                label="Confirmar contraseña"
                {...form.getInputProps("confirmPassword")}
                required
              />
              <Button type="submit">Continuar</Button>
            </form>
            <Anchor component={Link} to="/login">
              ¿Ya tienes cuenta? Inicia sesión
            </Anchor>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Register;
