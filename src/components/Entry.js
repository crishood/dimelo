import { Card, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";
import lorena from "../assets/img/lorena.png";
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
        </div>
        <div className="entry-body">
          {picture && <img src={lorena} />}

          <div className="entry-text-sound">
            <p>{description} </p>
            {audio && <ReactPlayer url={audio} width="100%" height="70px" />}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Entry;
