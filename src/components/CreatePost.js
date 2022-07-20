import {
  Card,
  Textarea,
  TextInput,
  Button,
  Avatar,
  Spoiler,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import { postNewEntry } from "../slices/userEntriesSlice";
import { useDispatch } from "react-redux";

const CreatePost = () => {
  const dispatch = useDispatch();
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
  const picture = ls.get("picture");
  const [image, setImage] = useState(null); //capturamos para mostrar base64
  const [file, setFile] = useState(null); //capturamos archivo para enviar obj

  const form = useForm({
    initialValues: {
      description: "",
      audio: "",
      picture: "",
    },
  });

  const handleSubmit = () => {
    const { description, picture, audio } = form.values;
    form.values.picture = file;
    dispatch(postNewEntry({ description, picture, audio }));
    form.reset();
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
    <div className="create-post-container">
      <Card>
        <Avatar size="md" color="blue" radius={200} src={picture}></Avatar>

        <form
          className="create-post-form"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Textarea
            placeholder="¿En qué estás trabajando?"
            required
            autosize
            minRows={2}
            maxRows={4}
            {...form.getInputProps("description")}
          />
          <Spoiler maxHeight={0} showLabel="Agregar medios" hideLabel="Ocultar">
            <TextInput
              placeholder="Comparte un enlace de Soundcloud, Spotify o YouTube"
              {...form.getInputProps("audio")}
            />
            <label htmlFor="img">Agrega una foto:</label>
            <input
              className="change-picture"
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleChange}
            />
          </Spoiler>

          <Button type="submit">Publicar</Button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePost;
