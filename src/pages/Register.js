import {
  Card,
  Stack,
  TextInput,
  NativeSelect,
  PasswordInput,
  Button,
  Anchor,
} from "@mantine/core";
import logoColor from "./../assets/svg/logo-color.svg";
const Register = () => {
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
                required
              />
              <TextInput placeholder="Tu correo" label="Email" required />
              <NativeSelect
                data={["Beatmaker", "Compositor"]}
                placeholder="Rol"
                label="Escoge tu rol principal"
                required
              />
              <NativeSelect
                placeholder="Ubicación"
                label="¿Dónde vives?"
                searchable
                required
                nothingFound="No pudimos encontrar tu ubicación"
                data={["Medellín", "Cali", "Bogotá", "Ibagué"]}
              />
              <PasswordInput
                placeholder="Contraseña"
                label="Contraseña"
                description="Tu contraseña debe incluir una letra, un número y un caracter especial"
                required
              />
              <PasswordInput
                placeholder="Contraseña"
                label="Confirmar contraseña"
                required
              />
              <Button>Continuar</Button>
            </form>
            <Anchor>¿Ya tienes cuenta? Inicia sesión</Anchor>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Register;
