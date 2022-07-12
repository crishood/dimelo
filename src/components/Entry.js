import { Card, Avatar } from "@mantine/core";
import { Crown } from "tabler-icons-react";
import lorena from "../assets/img/lorena.png";
import ReactPlayer from "react-player";

const Entry = () => {
  return (
    <div className="entry-container">
      <Card>
        <div className="entry-header">
          <Avatar size="sm" color="blue" radius={200}>
            <Crown size={14} />
          </Avatar>
          <h2>
            La Magia <span>(Beatmaker)</span>
          </h2>
        </div>
        <div className="entry-body">
          <img src={lorena} />
          <div className="entry-text-sound">
            <p>¿Qué tu crees que puedes caminar por encima del agua? </p>
            <ReactPlayer
              url="https://soundcloud.com/crishood/peyton"
              width="100%"
              height="70px"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Entry;
