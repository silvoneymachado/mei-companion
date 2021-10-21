import {
  ChevronLeft,
  ChevronRight,
  Group,
  Receipt,
  Description,
  Category,
  Settings,
  Logout,
} from "@mui/icons-material";
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CSSObject,
  styled,
  Theme,
} from "@mui/material";
import React, { useState } from "react";

import MuiDrawer from "@mui/material/Drawer";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/authContext";
import Dialog from "./dialog";

interface DrawerProps {
  isDrawerOpen: boolean;
  toggledrawer: () => void;
}

interface MenuItem {
  label: string;
  icon: JSX.Element;
  route: string;
}

const AppDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const { isDrawerOpen, toggledrawer } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const menuItems: MenuItem[] = [
    {
      label: "Parceiros",
      icon: <Group />,
      route: "/partners",
    },
    {
      label: "Lançamentos",
      icon: <Receipt />,
      route: "/invoices",
    },
    {
      label: "Despesas",
      icon: <Description />,
      route: "/expenses",
    },
    {
      label: "Categorias",
      icon: <Category />,
      route: "/categories",
    },
    {
      label: "Configurações",
      icon: <Settings />,
      route: "/configs",
    },
  ];

  const navigate = (item: MenuItem) => {
    router.push(item.route);
  };

  const confirmSignOut = () => {
    signOut();
  };

  return (
    <Drawer variant="permanent" open={isDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={toggledrawer}>
          {!isDrawerOpen ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={() => setIsModalOpen(true)}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"Sair"} />
        </ListItem>
      </List>
      <Divider />
      <Dialog
        contentText="Deseja realmente sair da aplicação?"
        title="Sair"
        onConfirm={() => confirmSignOut()}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
    </Drawer>
  );
};

export default AppDrawer;

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
