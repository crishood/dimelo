import { AppShell, Navbar, ActionIcon, Avatar } from "@mantine/core";
import logoResponsive from "./../assets/svg/logo-responsive.svg";
import { Home, Search, Star, Logout } from "tabler-icons-react";
import { Link } from "react-router-dom";

export default function Shell({ children }) {
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
              <Avatar color="blue" radius="xl" component={Link} to="/profile">
                <Star size={24} />
              </Avatar>
              <ActionIcon color="blue" variant="hover">
                <Logout size={24} />
              </ActionIcon>
            </div>
          </div>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}
