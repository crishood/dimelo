import {
  AppShell,
  Navbar,
  ActionIcon,
  Avatar,
  Popover,
  Button,
} from "@mantine/core";
import logoResponsive from "./../assets/svg/logo-responsive.svg";
import { Home, Search, Star, Logout } from "tabler-icons-react";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { setEntries } from "../slices/userEntriesSlice";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../index";

export default function Shell({ children }) {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const nav = useNavigate();
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
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 70 }}>
          <div className="nav">
            <div className="top-nav">
              <Link to="/feed">
                <img src={logoResponsive} alt="Dímelo ícono" width={32} />
              </Link>
              <ActionIcon
                color="blue"
                variant="hover"
                component={Link}
                to="/feed"
              >
                <Home size={24} />
              </ActionIcon>
              <ActionIcon
                color="blue"
                variant="hover"
                component={Link}
                to="/search"
              >
                <Search size={24} />
              </ActionIcon>
            </div>
            <div className="bottom-nav">
              <Avatar
                color="blue"
                radius="xl"
                component={Link}
                to="/profile"
                src={ls.get("picture")}
              ></Avatar>
              <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                target={
                  <ActionIcon
                    color="blue"
                    variant="hover"
                    onClick={() => setOpened((o) => !o)}
                  >
                    <Logout size={24} />
                  </ActionIcon>
                }
                position="right"
                withArrow
              >
                <div style={{ display: "flex" }}>
                  <Button
                    color="red"
                    onClick={() => {
                      localStorage.clear();
                      dispatch(setEntries([]));
                      purgeStoredState(persistConfig);
                      return nav("/");
                    }}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </Popover>
            </div>
          </div>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}
