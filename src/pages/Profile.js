import Shell from "../components/Shell";
import CreatePost from "../components/CreatePost";
import { Card, Avatar, ActionIcon } from "@mantine/core";
import { Pencil, Crown, BrandInstagram } from "tabler-icons-react";

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
        <CreatePost />
      </div>
    </Shell>
  );
};

export default Profile;
