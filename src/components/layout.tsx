import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import AppDrawer from "./appDrawer";
import ButtonAppBar from "./buttonAppBar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout: React.FC = ({ children }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <ButtonAppBar toggleDrawer={toggleDrawer} open={drawerIsOpen} />
      <AppDrawer isDrawerOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
