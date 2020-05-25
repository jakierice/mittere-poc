import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import * as RemoteData from "@devexperts/remote-data-ts";

import clsx from "clsx";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Toolbar,
  Typography,
  makeStyles,
  useTheme
} from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Contacts as ContactsIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Menu as MenuIcon
} from "@material-ui/icons";

import { signOut, AuthContext, CurrentUser } from "./Auth";
import { ToggleThemeButton } from "./Theme";

const NavListItem: React.FC<{
  to: string;
  children: React.ReactNode;
}> = props => (
  <ListItem
    button={true}
    component={NavLink}
    to={props.to}
    activeClassName="Mui-selected"
  >
    {props.children}
  </ListItem>
);

const OPEN = "open";
const CLOSED = "closed";
const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -DRAWER_WIDTH
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const getUserPhotoURL = (currentUser: CurrentUser): string =>
  pipe(
    RemoteData.toOption(currentUser),
    O.chain(
      O.fold(
        () => O.some(""),
        user => O.fromNullable(user.photoURL)
      )
    ),
    O.fold(
      () => "",
      URL => URL
    )
  );

function AppLayout(props: { children: React.ReactNode }) {
  const classes = useStyles();
  const theme = useTheme();

  const [userMenuState, setUserMenuState] = React.useState(CLOSED);
  const [drawerState, setDrawerState] = React.useState(CLOSED);

  const userAvatarRef = React.useRef(null);

  const currentUser = React.useContext(AuthContext);

  const handleOpenUserMenu = () => {
    setUserMenuState(OPEN);
  };

  const handleCloseUserMenu = () => {
    setUserMenuState(CLOSED);
  };

  const handleDrawerOpen = () => {
    setDrawerState(OPEN);
  };

  const handleDrawerClose = () => {
    setDrawerState(CLOSED);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerState === OPEN
        })}
      >
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(drawerState === OPEN && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Mittere
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <ToggleThemeButton />
                <IconButton
                  onClick={
                    userMenuState === OPEN
                      ? handleCloseUserMenu
                      : handleOpenUserMenu
                  }
                  ref={userAvatarRef}
                >
                  <Avatar src={getUserPhotoURL(currentUser)} />
                </IconButton>
                <Popover
                  open={userMenuState === OPEN}
                  anchorEl={userAvatarRef.current}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleCloseUserMenu}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Your Profile" />
                  </MenuItem>
                  <Divider />
                  <MenuItem button onClick={signOut}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Popover>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerState === OPEN}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavListItem to="/home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Misson Control" />
          </NavListItem>
          <NavListItem to="/contacts">
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </NavListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerState === OPEN
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}

export default AppLayout;
