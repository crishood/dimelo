import { Card, Avatar, ActionIcon, Popover } from "@mantine/core";
import { Link } from "react-router-dom";
import { DotsVertical, Trash } from "tabler-icons-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import moment from "moment";
import "moment/locale/es";
import { deleteAnEntry } from "../slices/userEntriesSlice";
import { useDispatch } from "react-redux";

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
          <Link to="/profile">
            <h2>
              {name} <span>({role})</span>
            </h2>
            <p className="date">{formatDate}</p>
          </Link>
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
