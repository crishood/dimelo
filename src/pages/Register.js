import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Stack,
  TextInput,
  NativeSelect,
  PasswordInput,
  Button,
  Anchor,
} from "@mantine/core";
import { CurrentLocation } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import logoColor from "./../assets/svg/logo-color.svg";
import { Link, useNavigate } from "react-router-dom";
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
    console.log(apiKey);
  }, []);

  const form = useForm({
    initialValues: {
      artistName: "",
      email: "",
      password: "",
      confirmPassword: "",
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

  return (
    <div className="form-page">
      <div className="form-container">
        <Card shadow="lg">
          <Stack spacing="md">
            <img
              src={logoColor}
              alt="Dímelo"
              width="110"
              className="logo-color"
            />
            <form className="form-wrapper">
              <TextInput
                placeholder="Tu nombre"
                label="Nombre artístico"
                {...form.getInputProps("artistName")}
                required
              />
              <TextInput placeholder="Tu correo" label="Email" required />
              <NativeSelect
                data={["Beatmaker", "Compositor"]}
                placeholder="Rol"
                label="Escoge tu rol principal"
                required
              />
              <TextInput
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
              <Button>Continuar</Button>
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
