import React, { useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
} from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/router";
import { Settings, Logout } from "@mui/icons-material";
import Link from "next/link";
import Dialog from "./dialog";

const drawerWidth = 0;

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
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderSessionControllers = () => (
    <Tooltip title="Account settings">
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          {user?.name.substring(0, 1).toUpperCase()}
        </Avatar>
      </IconButton>
    </Tooltip>
  );

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Typography variant="body1" component="div">
            {`Olá ${user?.name}`}
          </Typography>
        </MenuItem>
        <Divider />
        <Link href={"/profile"}>
          <MenuItem>
            <Avatar /> Perfil
          </MenuItem>
        </Link>
        <Divider />
        <Link href={"/configs"}>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Configurações
          </MenuItem>
        </Link>
        <MenuItem onClick={() => setIsModalOpen(true)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  };

  const goHome = () => {
    router.replace("/dashboard");
  };

  const confirmSignOut = () => {
    signOut();
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
                // ...(open && { display: "none" }),
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
          {renderMenu()}
        </Toolbar>
        <Dialog
          contentText="Deseja sair da aplicação?"
          title="Sair"
          onConfirm={() => confirmSignOut()}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        />
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
