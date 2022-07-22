import { Card, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";

const ArtistFound = ({ name, picture, role, location }) => {
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
  return (
    <div className="artist-container">
      <Card>
        <Link to={userName === name ? `/profile` : `/user/${name}`}>
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
