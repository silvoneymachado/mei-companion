import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, styled } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/router";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
  toggledrawer?: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ButtonAppBar = (props: AppBarProps) => {
  const { open, toggledrawer } = props;
  const { user } = useAuth();
  const router = useRouter();

  const renderSessionControllers = () => (
    <>
      <Typography variant="body1" component="div">
        {`Bem vindo ${user.name}`}
      </Typography>
    </>
  );

  const goHome = () => {
    router.replace("/dashboard");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {!!user && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggledrawer}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <Button
              variant="text"
              onClick={goHome}
              sx={{ textTransform: "none" }}
              color="inherit"
            >
              MEI Companion
            </Button>
          </Typography>
          {!!user && renderSessionControllers()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
