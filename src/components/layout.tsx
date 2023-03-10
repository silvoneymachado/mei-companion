import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import AppDrawer from "./appDrawer";
import AuthRenderer from "./authRenderer";
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

  const toggledrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const renderScaffold = () => (
    <>
      <AppDrawer isDrawerOpen={drawerIsOpen} toggledrawer={toggledrawer} />
    </>
  );
  
  return (
    <Box sx={{ display: "flex" }}>
      <AuthRenderer protectedComponent={renderScaffold()} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <ButtonAppBar toggledrawer={toggledrawer} open={drawerIsOpen} />  
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
