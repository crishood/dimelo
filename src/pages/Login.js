import {
  Card,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import logoColor from "./../assets/svg/logo-color.svg";
const Login = () => {
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
              <TextInput placeholder="Tu correo" label="Email" required />

              <PasswordInput
                placeholder="Contraseña"
                label="Contraseña"
                description="Tu contraseña debe incluir una letra, un número y un caracter especial"
                required
              />

              <Button>Continuar</Button>
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
