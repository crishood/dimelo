import {
  Card,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
} from "@mantine/core";
import logoColor from "./../assets/svg/logo-color.svg";
import { Link, useNavigate } from "react-router-dom";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import { X } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
const Login = () => {
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
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
          ? null
          : "El email no es válido",
      password: (value) =>
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)
          ? null
          : "La contraseña debe contener mínimo 8 carácteres y al menos una letra mayúscula, una letra minúscula y un número",
    },
  });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    const { email, password } = form.values;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL_BACK}/users/login`,
        {
          email: email,
          password: password,
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
        nav("/feed");
      }
    } catch (e) {
      showNotification({
        disallowClose: true,
        title: "¡Oye!",
        message: "Verifica tu nombre de usuario o contraseña",
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
                placeholder="Tu correo"
                label="Email"
                required
                {...form.getInputProps("email")}
              />

              <PasswordInput
                placeholder="Contraseña"
                label="Contraseña"
                description="Tu contraseña debe incluir una letra, un número y un caracter especial"
                {...form.getInputProps("password")}
                required
              />

              <Button type="submit">Continuar</Button>
            </form>
            <Anchor component={Link} to="/register">
              ¿No tienes cuenta? Regístrate
            </Anchor>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Login;
