import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import logoText from "./../logoText.png";
import SearchBar from "./SearchBar/SearchBar";
import MenuDropDown from "./MenuDropDown";
import { selectInfo, logOutUser, selectUserID } from "./Users/usersSlice";
import { useSelector, useDispatch } from "react-redux";

import firebase from "firebase/app";

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

const MenuBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userInformation = useSelector(selectInfo);
  const [currentUser, setCurrentUser] = useState("");
  const currentUserID = useSelector(selectUserID);

  const handleClick = async (e) => {
    e.preventDefault();
    debugger;
    await firebase.auth().signOut();
    await setCurrentUser("");
    await dispatch(logOutUser());

    //call other actions to clear react state
  };
  debugger;
  return (
    <AppBar
      position="fixed"
      //   className={clsx(classes.appBar, {
      //     [classes.appBarShift]: open,
      //   })}
    >
      <Toolbar>
        <NavLink to={"/"}>
          <img
            src={logoText}
            style={{ height: "75px", paddingBottom: "10px", marginRight: 30 }}
            alt="logo text"
          ></img>
        </NavLink>

        <SearchBar style={{ marginLeft: 10 }} />
        {currentUserID ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <NavLink to={"/userprofile"}>
                <Avatar
                  style={{ margin: 5, marginLeft: 50 }}
                  alt="avatar"
                  src={userInformation.photoURL}
                >
                  {" "}
                </Avatar>
              </NavLink> */}
            <MenuDropDown />
            <Button
              onClick={handleClick}
              variant="outlined"
              color="secondary"
              style={{ margin: 5 }}
            >
              logout
            </Button>
          </div>
        ) : (
          <div>
            <Button
              id="navbarButton"
              variant="contained"
              color="secondary"
              href="./login"
              style={{ marginLeft: 5 }}
            >
              login
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              href="./login"
              style={{ marginLeft: 5 }}
            >
              signup
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
