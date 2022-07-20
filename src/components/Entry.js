import { Card, Avatar, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import { DotsVertical } from "tabler-icons-react";
import ReactPlayer from "react-player";
import moment from "moment";
import "moment/locale/es";

const Entry = ({ name, role, avatar, description, picture, audio, date }) => {
  moment.locale("es");
  const formatDate = moment(date).locale("es").format("LLLL");

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
          <ActionIcon>
            <DotsVertical />
          </ActionIcon>
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
