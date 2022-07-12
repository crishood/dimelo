import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  Avatar,
} from "@mantine/core";
import logoResponsive from "./../assets/svg/logo-responsive.svg";
import { Home, Search, Star, Logout } from "tabler-icons-react";

export default function Shell({ children }) {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 70 }}>
          <div className="nav">
            <div className="top-nav">
              <img src={logoResponsive} alt="Dímelo ícono" width={32} />
              <ActionIcon color="blue" variant="hover">
                <Home size={24} />
              </ActionIcon>
              <ActionIcon color="blue" variant="hover">
                <Search size={24} />
              </ActionIcon>
            </div>
            <div className="bottom-nav">
              <Avatar color="blue" radius="xl">
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
