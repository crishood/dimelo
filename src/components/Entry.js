import { Card, Avatar, ActionIcon, Popover } from "@mantine/core";
import { Link } from "react-router-dom";
import { DotsVertical, Trash } from "tabler-icons-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import moment from "moment";
import "moment/locale/es";
import { deleteAnEntry } from "../slices/userEntriesSlice";
import { useDispatch } from "react-redux";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";

const Entry = ({
  name,
  role,
  avatar,
  description,
  picture,
  audio,
  date,
  id,
}) => {
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

  const userName = ls.get("name");

  const dispatch = useDispatch();
  moment.locale("es");
  const formatDate = moment(date).locale("es").format("LLLL");
  const [opened, setOpened] = useState(false);
  const handleDelete = () => {
    dispatch(deleteAnEntry(id));
  };
  return (
    <div className="entry-container">
      <Card>
        <div className="entry-header">
          <Avatar size="sm" color="blue" radius={200} src={avatar}></Avatar>
          <Link to={userName === name ? `/profile` : `/user/${name}`}>
            <h2>
              {name} <span>({role})</span>
            </h2>
            <p className="date">{formatDate}</p>
          </Link>
          {userName === name ? (
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              target={
                <ActionIcon onClick={() => setOpened((o) => !o)}>
                  <DotsVertical />
                </ActionIcon>
              }
              position="right"
            >
              <ActionIcon color="red" onClick={() => handleDelete()}>
                <Trash />
              </ActionIcon>
            </Popover>
          ) : (
            <div></div>
          )}
        </div>
        <div className="entry-body">
          <div className="media">
            {picture && <img src={picture} />}
            {audio && <ReactPlayer url={audio} width="100%" height="70px" />}
          </div>

          <div className="entry-text-sound">
            <p>{description} </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Entry;
