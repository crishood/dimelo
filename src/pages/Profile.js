import Shell from "../components/Shell";
import CreatePost from "../components/CreatePost";
import {
  Card,
  Avatar,
  ActionIcon,
  Button,
  TextInput,
  NativeSelect,
  Textarea,
  Input,
} from "@mantine/core";
import {
  Pencil,
  Crown,
  BrandInstagram,
  BrandSpotify,
  BrandSoundcloud,
  BrandYoutube,
} from "tabler-icons-react";

const Profile = () => {
  return (
    <Shell>
      <div className="feed">
        <div className="profile-container">
          <Card>
            <div className="profile-edit">
              <ActionIcon variant="transparent" color="blue">
                <Pencil size={24} />
              </ActionIcon>
            </div>
            <div className="profile-info">
              <Avatar size="xl" color="blue" radius={200}>
                <Crown size={24} />
              </Avatar>
              <h2>
                La Magia <span>(Beatmaker)</span>
              </h2>
              <div className="profile-followers">
                <span>14 seguidores</span>
                <span>17 siguiendo</span>
              </div>
              <p className="description">
                Aquí no hay miedo lo dejamo en la gabeta ma G.
              </p>
              <p>contact@lamagia.com</p>
              <p>Medellín, Colombia</p>
              <div className="profile-socialmedia">
                <ActionIcon variant="transparent" color="blue">
                  <BrandInstagram size={24} />
                </ActionIcon>
              </div>
            </div>
          </Card>
        </div>
        <div className="profile-container">
          <Card>
            <form>
              <div className="profile-edit">
                <Button color="blue" size="xs">
                  Guardar cambios
                </Button>
              </div>
              <div className="profile-info-edit">
                <Avatar size="xl" color="blue" radius={200}>
                  <p className="change-picture">Cambiar</p>
                </Avatar>
                <TextInput
                  placeholder="La Magia"
                  label="Nombre artístico"
                  required
                />
                <NativeSelect
                  data={["Beatmaker", "Compositor"]}
                  value="Beatmaker"
                  placeholder="Beatmaker"
                  label="Escoge tu rol principal"
                  required
                />
                <Textarea
                  placeholder="Descripción"
                  value="Aquí no hay miedo lo dejamo en la gabeta ma G."
                  label="Descripción"
                  required
                />
                <NativeSelect
                  placeholder="Ubicación"
                  label="¿Dónde vives?"
                  value="Medellín"
                  searchable
                  required
                  nothingFound="No pudimos encontrar tu ubicación"
                  data={["Medellín", "Cali", "Bogotá", "Ibagué"]}
                />
                <Input
                  icon={<BrandInstagram size={16} />}
                  placeholder="Instagram"
                />
                <Input
                  icon={<BrandSpotify size={16} />}
                  placeholder="Spotify"
                />
                <Input
                  icon={<BrandYoutube size={16} />}
                  placeholder="Youtube"
                />
                <Input
                  icon={<BrandSoundcloud size={16} />}
                  placeholder="Soundcloud"
                />
              </div>
            </form>
          </Card>
        </div>
        <CreatePost />
      </div>
    </Shell>
  );
};

export default Profile;
