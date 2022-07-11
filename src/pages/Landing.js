import { Button } from "@mantine/core";
import videoBackground from "../assets/video/video-bg.mp4";
import logoWhite from "../assets/svg/logo-white.svg";

const Landing = () => {
  return (
    <div>
      <video autoPlay muted loop className="videoBackground">
        <source src={videoBackground} type="video/mp4" />
      </video>
      <div className="landing">
        <div className="landing-content">
          <img src={logoWhite} alt="Dímelo" />
          <h1 className="landing-title">
            Conecta con beatmakers y compositores de tu ciudad
          </h1>
          <div className="landing-buttons">
            <Button>Regístrate</Button>
            <Button variant="light">Iniciar sesión</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
