import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
//components//
import SearchBar from "../SearchBar/SearchBar";
import ItneraryList from "./ItineraryList";
import Map from "../Map/Map";
import SearchResultDisplayPage from "../Search/SearchResultDisplayPage";
import ItineraryDisplay from "./ItineraryDisplay";
import logoText from "../../logoText.png";
import { selectInfo, logOutUser } from "../Users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";

const drawerWidth = 375;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    marginTop: "50px",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "#508991",
    marginTop: "50px",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    marginTop: "50px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: "1px",
    // width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: "1px",
      //   width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    marginTop: "10px",
    padding: "10px",
  },
}));

export default function MyItin() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [mapWidth, setmapWidth] = useState("600px");
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const userInformation = useSelector(selectInfo);

  const handleDrawerOpen = () => {
    setOpen(true);
    setmapWidth("320px");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setmapWidth("600px");
  };

  const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    dispatch(logOutUser());
    //call other actions to clear react state
  };

  const openPin = () => {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <NavLink to={"/"}>
            <img
              src={logoText}
              style={{ height: "75px", paddingBottom: "10px" }}
              alt="logo text"
            ></img>
          </NavLink>
          {open === true ? (
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <p>View Itinerary</p>
                <MenuIcon />
              </Button>
            </div>
          )}
          <SearchBar />
          {userInformation.length ? (
            <div>
              <Button
                id="navbarButton"
                variant="contained"
                color="secondary"
                href="./login"
              >
                login
              </Button>

              <Button variant="outlined" color="secondary" href="./login">
                signup
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <NavLink to={"/userprofile"}>
                <Avatar
                  style={{ margin: 5, marginLeft: 50 }}
                  alt="avatar"
                  src={userInformation.photoURL}
                >
                  {" "}
                </Avatar>
              </NavLink>
              <Button
                onClick={handleClick}
                variant="outlined"
                color="secondary"
                style={{ margin: 5 }}
              >
                logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <ItineraryDisplay />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SearchResultDisplayPage
            style={{
              padding: " 0px 0px 0px 0px",
              // margin: " 0px 0px 0px 0px",
              marginTop: "10px",
              overflow: "scroll",
              height: "500px",
            }}
            setSelected={setSelected}
            selected={selected}
          />
          <div
            id="mapDiv"
            style={{
              height: "200px",
              width: mapWidth,
            }}
          >
            <Map setSelected={setSelected} selected={selected} />
          </div>
        </div>
      </main>
    </div>
  );
}
