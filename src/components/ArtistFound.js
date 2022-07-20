import { Card, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";

const ArtistFound = ({ name, picture, role, location }) => {
  return (
    <div className="artist-container">
      <Card>
        <Link to={`/user/${name}`}>
          <div className="artist-info">
            <Avatar size="md" color="blue" radius={200} src={picture}></Avatar>
            <div className="artist-text">
              <h2>
                {name} <span>({role})</span>
              </h2>
              <p className="artist-location">{location}</p>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default ArtistFound;
