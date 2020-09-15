//NEEWW

import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HomeButtonCards from "./homecomponents/homecards";
import "./home.css";
import Howto from "./HowTo/HowTo";
import { logOutUser, addInfo } from "../Users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";
import logoImg from "../../logoImg.png";
import logoText from "../../logoText.png";
import { NavLink } from "react-router-dom";
import { selectInfo } from "../Users/usersSlice";
import MenuDropDown from "../MenuDropDown";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <NavLink to={"/"}>
        <img
          src={logoImg}
          style={{ marginTop: 5, height: "50px" }}
          alt="logo text"
        ></img>
      </NavLink>

      <div>
        {" Tinni © "}
        {new Date().getFullYear()}
      </div>
    </Typography>
  );
}
const trendingTopics = [
  {
    url:
      "https://www.thenewpotato.com/wp-content/uploads/2017/06/best-burger-new-york-2017.jpg",
    title: "Burgers",
    margin: "1px",
    width: "30%",
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Unisfera_Flushing.jpg",
    title: "Parks",

    margin: "1px",
    width: "30%",
  },
  {
    url: "https://itsinqueens.com/wp-content/uploads/2019/08/MG_2910.jpg",
    title: "Salsa",
    margin: "1px",
    width: "30%",
  },
];

const useStyles = makeStyles((theme) => ({
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
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [1, 2, 3];

export default function Album() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState("");
  const userInformation = useSelector(selectInfo);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    setCurrentUser("");
    //call other actions to clear react state
  };

  const handleUser = () => {
    // dispatch(addUser(currentUser.uid));
    dispatch(addInfo(currentUser.providerData[0]));
    //calls to save user into backend
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* logo */}
          <NavLink to={"/"}>
            <img
              src={logoText}
              style={{ height: "75px" }}
              alt="logo text"
            ></img>
          </NavLink>
          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              {/* <Typography variant="h6" color="inherit" noWrap>
                                                  CodeName IDA
                                              </Typography> */}
            </Grid>
            <Grid item>
              {userInformation ? (
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div
          className={classes.heroContent}
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1488628278511-2177a435414d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1150&q=80")`,
          }}
        >
          <Container maxWidth="sm">
            <img
              src={logoImg}
              style={{ paddingLeft: "150px" }}
              alt="Logo with Astro"
            ></img>

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <div style={{ backgroundColor: "#004346", height: "5em" }}>
                  <SearchBar />
                </div>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Howto />
        </Container>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="Primary"
            gutterBottom
            id="section-name-Typ"
          >
            Trending Topics In NYC
          </Typography>
          <Grid container spacing={5}>
            <HomeButtonCards trendingTopics={trendingTopics} />
          </Grid>
          {/* <Howto /> */}
        </Container>
      </main>
      {/* Footer */}
      <hr />
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Run your day, dont let your day run you!
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        ></Typography>
        <Copyright />
      </footer>

      {/* {currentUser ? handleUser() : null} */}
    </>
  );
}
