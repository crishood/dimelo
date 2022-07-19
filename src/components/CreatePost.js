import { Card, Textarea, TextInput, Button, Avatar } from "@mantine/core";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";

const CreatePost = () => {
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
  return (
    <div className="create-post-container">
      <Card>
        <Avatar size="md" color="blue" radius={200} src={picture}></Avatar>

        <form className="create-post-form">
          <Textarea
            placeholder="¿En qué estás trabajando?"
            required
            autosize
            minRows={2}
            maxRows={4}
          />

          <TextInput
            placeholder="Soundcloud, Spotify, YouTube..."
            label="Comparte un enlace"
          />

          <Button>Publicar</Button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePost;
