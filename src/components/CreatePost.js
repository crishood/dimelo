import { Card, Textarea, ActionIcon, Button } from "@mantine/core";
import { DeviceAudioTape, Photo } from "tabler-icons-react";
const CreatePost = () => {
  return (
    <div className="create-post-container">
      <Card>
        <form className="create-post-form">
          <Textarea
            placeholder="¿En qué estás trabajando?"
            required
            autosize
            minRows={2}
            maxRows={4}
          />
          <div className="create-post-media">
            <ActionIcon variant="light" color="blue">
              <DeviceAudioTape size={24} />
            </ActionIcon>
            <ActionIcon variant="light" color="blue">
              <Photo size={24} />
            </ActionIcon>
          </div>
          <Button>Publicar</Button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePost;
