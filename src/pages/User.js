import Shell from "../components/Shell";
import UserEntires from "../components/UserEntries";
import { Card, Avatar, ActionIcon, Button, Loader } from "@mantine/core";
import {
  BrandInstagram,
  BrandSpotify,
  BrandYoutube,
  BrandSoundcloud,
} from "tabler-icons-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux/es/exports";
import { fetchFollow } from "../slices/userEntriesSlice";
import { followUser } from "../api";

const User = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("id");
  const loading = useSelector((state) => state.ui.loading);
  const { artistName } = useParams();
  const users = useSelector((state) => state.users.users, shallowEqual);
  const [user, setUser] = useState(
    users.filter((item) => item.artistName === artistName)[0]
  );
  const [followersCount, setFollowersCount] = useState(user.followers.length);
  const [followingCount, setFollowingCount] = useState(user.following.length);
  const [follow, setFollow] = useState(false);
  const following = useSelector(
    (state) => state.userEntries.following,
    shallowEqual
  );
  useEffect(() => {
    following.filter((item) => item.artistName === artistName).length === 1
      ? setFollow(true)
      : setFollow(false);
  }, []);
  const handleFollow = () => {
    if (!follow) {
      followUser(userId, user._id, "follow");
      setFollowersCount(followersCount + 1);
      dispatch(fetchFollow());
    } else {
      followUser(userId, user._id, "unfollow");
      setFollowersCount(followersCount - 1);
      dispatch(fetchFollow());
    }
    setFollow((f) => !f);
  };
  return (
    <Shell>
      <div className="feed">
        <div className="profile-container">
          <Card>
            <div className="profile-edit">
              <Button
                size="xs"
                color={!follow ? "blue" : "red"}
                onClick={() => handleFollow()}
              >
                {!follow ? "Seguir" : "Dejar de seguir"}
              </Button>
            </div>

            {loading && users.length === 0 ? (
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
                  <span>{followersCount} seguidores</span>
                  <span>{followingCount} siguiendo</span>
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
        {user.entries.length > 0 && (
          <UserEntires
            entries={user.entries}
            artistName={user.artistName}
            role={user.role}
            picture={user.picture}
          />
        )}
      </div>
    </Shell>
  );
};

export default User;
