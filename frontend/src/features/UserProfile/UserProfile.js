import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar.js";
import firebase from "firebase/app";
import {
  selectInfo,
  addInfo,
  addUser,
  selectUserID,
} from "../Users/usersSlice";
import { useDispatch } from "react-redux";
import { getAPI } from "../../util/utils";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Link,
} from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ItinCards } from "./ItinCards";
import logoText from "../../logoText.png";
import { NavLink } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        CodeName IDA
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  root2: {
    flexGrow: 1,
    padding: theme.spacing(2),
    display: "flex",
    flex: "column",
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const cards = [1, 2, 3];

export default function ItinResPage() {
  const classes = useStyles();
  // const itineraryResult = useSelector(selectSearchResults);
  // const currentItinerary = useSelector(selectCurrentItin);
  const theme = useTheme();
  const userInformation = useSelector(selectInfo);
  const currentUserID = useSelector(selectUserID);
  const [currentUser, setCurrentUser] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [open, setOpen] = useState(false);
  const [mapWidth, setmapWidth] = useState("600px");
  // debugger
  const dispatch = useDispatch();

  const API = getAPI();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User has successfully logged in!");
        setCurrentUser(user);
        getAllUsers();
        checkDBForUser(user);
      }
    });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setmapWidth("320px");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setmapWidth("600px");
  };

  const checkDBForUser = async (user) => {
    console.log("function hit");

    try {
      // debugger
      console.log("userId being passed", user.uid);
      let res = await axios.get(`${API}/users/${user.uid}`);
      if (res.data.payload.length) {
        setUserExists(true);
      } else {
        // debugger
        signUserUp(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUserUp = async (user) => {
    debugger;
    try {
      let { displayName, email, phoneNumber, photoURL } = user.providerData[0];

      await axios.post(`${API}/users/`, {
        //signup auth user
        id: user.uid,
        first_name: displayName,
        last_name: "",
        email: email,
        password: "",
        phone: phoneNumber,
        location: "",
        profile_pic: photoURL,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      let res = await axios.get(`${API}/users/`);
      console.log(res);
      // debugger
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    setCurrentUser("");
    //call other actions to clear react state
  };

  const handleUser = () => {
    dispatch(addUser(currentUser.uid));
    dispatch(addInfo(currentUser.providerData[0]));
  };

  return (
    <>
      {/* {currentUser ? checkDBForUser : null} */}
      {/* {console.log("is user in db", userExists)} */}
      <CssBaseline />
      <AppBar position="relative">
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
      <div
        style={{
          maxwidth: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "250px",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt="avatar"
            src={userInformation.photoURL}
            className={classes.large}
            style={{ marginTop: "50px" }}
          ></Avatar>

          <div style={{ marginTop: "30px", height: "50px" }}>
            <Typography variant="h4">{userInformation.displayName}</Typography>
          </div>
        </div>
      </div>
      <div style={{ display: "flex",
                    backgroundcolor: "grey",
                    opacity: "0.5",
                    border: "2px grey",
                    borderRadius: "8px" }}>
        <Grid container className={classes.root2} spacing={2}>
          <ItinCards />
        </Grid>
      </div>
      <div>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Run your day, dont let your day run you!
        </Typography>
        <Copyright />
        End footer
        {console.log(userInformation)}
      </div>
      {currentUser ? handleUser() : null}
    </>
  );
}
