import {
  ChevronLeft,
  ChevronRight,
  Group,
  Receipt,
  Description,
  Category,
  Settings,
  Logout,
  Dashboard,
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
  Tooltip,
} from "@mui/material";
import React from "react";

import MuiDrawer from "@mui/material/Drawer";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <Dashboard />,
      route: "/dashboard",
    },
    {
      label: "Parceiros",
      icon: <Group />,
      route: "/partners",
    },
    {
      label: "Lançamentos - NF-e",
      icon: <Receipt />,
      route: "/invoices",
    },
    {
      label: "Categorias",
      icon: <Category />,
      route: "/categories",
    },
    {
      label: "Despesas",
      icon: <Description />,
      route: "/expenses",
    },
  ];

  const navigate = (item: MenuItem) => {
    router.push(item.route);
  };

  return (
    <Drawer
      // container={window.document.body}
      variant="permanent"
      open={isDrawerOpen}
      onClose={toggledrawer}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <DrawerHeader>
        <IconButton onClick={toggledrawer}>
          {!isDrawerOpen ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <Tooltip key={index} title={item.label} placement="right" arrow>
            <ListItem button onClick={() => navigate(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
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
