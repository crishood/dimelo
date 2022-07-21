import Shell from "../components/Shell";
import Entry from "../components/Entry";
import { Card, Avatar, ActionIcon, Button, Loader } from "@mantine/core";
import {
  BrandInstagram,
  BrandSpotify,
  BrandYoutube,
  BrandSoundcloud,
} from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import { setLoading } from "../slices/uiSlice";
import { useDispatch, useSelector, shallowEqual } from "react-redux/es/exports";

const User = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const { artistName } = useParams();
  const users = useSelector((state) => state.users.users, shallowEqual);
  const [user, setUser] = useState(
    users.filter((item) => item.artistName === artistName)[0]
  );
  const fetchData = () => {};
  useEffect(() => {}, []);
  return (
    <Shell>
      <div className="feed">
        <div className="profile-container">
          <Card>
            <div className="profile-edit">
              <Button size="xs" color="blue">
                Seguir
              </Button>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="profile-info">
                <Avatar
                  size="xl"
                  color="blue"
                  radius={200}
                  src={user.picture}
                ></Avatar>
                <h2>
                  {user.artistName} <span>({user.role})</span>
                </h2>
                <div className="profile-followers">
                  <span>
                    {user.followers.length === 0 ? "0" : user.followers.length}{" "}
                    seguidores
                  </span>
                  <span>
                    {user.following.length === 0 ? "0" : user.following.length}{" "}
                    siguiendo
                  </span>
                </div>
                <p className="description">{user.bio}</p>
                <p>{user.email}</p>
                <p>{user.location}</p>
                <div className="profile-socialmedia">
                  {user.links[0].length > 1 && (
                    <ActionIcon
                      variant="transparent"
                      color="blue"
                      target="_blank"
                      component="a"
                      href={user.links[0]}
                    >
                      <BrandInstagram size={24} />
                    </ActionIcon>
                  )}
                  {user.links[1].length > 1 && (
                    <ActionIcon
                      variant="transparent"
                      color="blue"
                      target="_blank"
                      component="a"
                      href={user.links[1]}
                    >
                      <BrandSpotify size={24} />
                    </ActionIcon>
                  )}
                  {user.links[2].length > 1 && (
                    <ActionIcon
                      variant="transparent"
                      color="blue"
                      target="_blank"
                      component="a"
                      href={user.links[2]}
                    >
                      <BrandYoutube size={24} />
                    </ActionIcon>
                  )}
                  {user.links[3].length > 1 && (
                    <ActionIcon
                      variant="transparent"
                      color="blue"
                      target="_blank"
                      component="a"
                      href={user.links[3]}
                    >
                      <BrandSoundcloud size={24} />
                    </ActionIcon>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
        <Entry />
      </div>
    </Shell>
  );
};

export default User;
