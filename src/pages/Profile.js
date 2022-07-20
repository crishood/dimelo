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
} from "@mantine/core";
import {
  Pencil,
  BrandInstagram,
  BrandSpotify,
  BrandSoundcloud,
  BrandYoutube,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import { useState } from "react";
import axios from "axios";
import ProfileEntries from "../components/ProfileEntries";

const Profile = () => {
  const [address, setAddress] = useState({});
  const [edit, setEdit] = useState(false);

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

  const [artistName, setArtistName] = useState(ls.get("name"));
  const [role, setRole] = useState(ls.get("role"));
  const location = ls.get("location");
  const [image, setImage] = useState(null); //capturamos para mostrar base64
  const [file, setFile] = useState(null); //capturamos archivo para enviar obj
  const [picture, setPicture] = useState(ls.get("picture"));
  const [bio, setBio] = useState(ls.get("bio"));
  const [links, setLinks] = useState(JSON.parse(ls.get("links")));

  const email = ls.get("email");
  const form = useForm({
    initialValues: {
      artistName: artistName,
      bio: bio,
      role: role,
      picture: picture,
      links: links,
      instagram: links[0],
      spotify: links[1],
      youtube: links[2],
      soundcloud: links[3],
    },
  });

  const handleSubmit = async (e) => {
    const { artistName, role, bio, picture, links } = form.values;
    if (file) {
      form.values.picture = file;
    }
    console.log(form.values);
    form.values.links = [
      form.values.instagram,
      form.values.spotify,
      form.values.youtube,
      form.values.soundcloud,
    ];
    ls.set("artistName", artistName);
    ls.set("bio", bio);
    ls.set("role", role);
    ls.set("links", JSON.stringify(form.values.links));
    setArtistName(artistName);

    setBio(bio);
    setRole(role);
    setLinks(form.values.links);

    const response = await axios.put(
      `${process.env.REACT_APP_URL_BACK}/users/myuser`,
      form.values,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const updatePicture = await axios.get(
      `${process.env.REACT_APP_URL_BACK}/users/myuser`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    ls.set("picture", updatePicture.data.data.picture);
    setPicture(ls.get("picture"));
    setEdit((e) => !e);
    setFile(null);
    setImage(null);
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    console.dir(e.target.files);
    readFile(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <Shell>
      <div className="feed">
        {!edit ? (
          <>
            <div className="profile-container">
              <Card>
                <div className="profile-edit">
                  <ActionIcon
                    variant="transparent"
                    color="blue"
                    onClick={() => {
                      setEdit((e) => !e);
                    }}
                  >
                    <Pencil size={24} />
                  </ActionIcon>
                </div>
                <div className="profile-info">
                  <Avatar
                    size="xl"
                    color="blue"
                    radius={200}
                    src={picture}
                  ></Avatar>
                  <h2>
                    {artistName} <span>{`(${role})`}</span>
                  </h2>
                  <div className="profile-followers">
                    <span>14 seguidores</span>
                    <span>17 siguiendo</span>
                  </div>
                  <p className="description">{bio}</p>
                  <p>{email}</p>
                  <p>{location}</p>
                  <div className="profile-socialmedia">
                    {links[0].length > 1 && (
                      <ActionIcon
                        variant="transparent"
                        color="blue"
                        target="_blank"
                        component="a"
                        href={links[0]}
                      >
                        <BrandInstagram size={24} />
                      </ActionIcon>
                    )}
                    {links[1].length > 1 && (
                      <ActionIcon
                        variant="transparent"
                        color="blue"
                        target="_blank"
                        component="a"
                        href={links[1]}
                      >
                        <BrandSpotify size={24} />
                      </ActionIcon>
                    )}
                    {links[2].length > 1 && (
                      <ActionIcon
                        variant="transparent"
                        color="blue"
                        target="_blank"
                        component="a"
                        href={links[2]}
                      >
                        <BrandYoutube size={24} />
                      </ActionIcon>
                    )}
                    {links[3].length > 1 && (
                      <ActionIcon
                        variant="transparent"
                        color="blue"
                        target="_blank"
                        component="a"
                        href={links[3]}
                      >
                        <BrandSoundcloud size={24} />
                      </ActionIcon>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <CreatePost />
            <ProfileEntries />
          </>
        ) : (
          <div className="profile-container">
            <Card>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="profile-edit">
                  <Button color="blue" size="xs" type="submit">
                    Guardar cambios
                  </Button>
                </div>
                <div className="profile-info-edit">
                  {!!image ? (
                    <Avatar
                      size="xl"
                      color="blue"
                      radius={200}
                      src={image}
                    ></Avatar>
                  ) : (
                    <Avatar
                      size="xl"
                      color="blue"
                      radius={200}
                      src={picture}
                    ></Avatar>
                  )}

                  <label htmlFor="img">
                    Selecciona tu nueva foto de perfil:
                  </label>
                  <input
                    className="change-picture"
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <TextInput
                    placeholder={artistName}
                    label="Nombre artístico"
                    onChange={(e) => setArtistName(e.target.value)}
                    value={artistName}
                    {...form.getInputProps("artistName")}
                    required
                  />
                  <NativeSelect
                    data={["Beatmaker", "Compositor"]}
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    placeholder="Beatmaker"
                    label="Escoge tu rol principal"
                    {...form.getInputProps("role")}
                    required
                  />
                  <Textarea
                    placeholder={bio}
                    label="Descripción"
                    onChange={(e) => setBio(e.target.value)}
                    {...form.getInputProps("bio")}
                  />
                  <TextInput
                    icon={<BrandInstagram size={16} />}
                    placeholder="Instagram"
                    value={form.values.instagram}
                    onChange={(event) =>
                      form.setFieldValue("instagram", event.currentTarget.value)
                    }
                  />
                  <TextInput
                    icon={<BrandSpotify size={16} />}
                    placeholder="Spotify"
                    value={form.values.spotify}
                    onChange={(event) =>
                      form.setFieldValue("spotify", event.currentTarget.value)
                    }
                  />
                  <TextInput
                    icon={<BrandYoutube size={16} />}
                    placeholder="Youtube"
                    value={form.values.youtube}
                    onChange={(event) =>
                      form.setFieldValue("youtube", event.currentTarget.value)
                    }
                  />
                  <TextInput
                    icon={<BrandSoundcloud size={16} />}
                    placeholder="Soundcloud"
                    value={form.values.soundcloud}
                    onChange={(event) =>
                      form.setFieldValue(
                        "soundcloud",
                        event.currentTarget.value
                      )
                    }
                  />
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </Shell>
  );
};

export default Profile;
