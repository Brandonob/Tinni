//NEEWW

import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import {
  AppBar,
  Button,
  // Card,
  // CardActions,
  // CardContent,
  // CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Link,
} from "@material-ui/core";
// import CameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HomeButtonCards from "./homecomponents/homecards";
import "./home.css";
import { addUser, logOutUser } from "../Users/usersSlice";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
// import { white, purple } from "@material-ui/core/colors";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        CodeName IDA
      </Link>{" "}
      {new Date().getFullYear()}
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
    width: "30%",
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

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cards = [1, 2, 3];

export default function Album() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User has successfullylogged in!");
        setCurrentUser(user);
      }
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    setCurrentUser("");
    //call other actions to clear react state
  };

  const handleUser = () => {
    dispatch(addUser(currentUser.uid));
    //calls to save user into backend
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon className={classes.icon} /> */}
          {/* <Typography variant="h6" color="inherit" noWrap>
                                                CodeName IDA
                                            </Typography> */}
          <Typography variant="h6" color="inherit">
            codenameIDA
          </Typography>

          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              {/* <Typography variant="h6" color="inherit" noWrap>
                                                  CodeName IDA
                                              </Typography> */}
            </Grid>
            <Grid item>
              {currentUser ? null : (
                <Button
                  id="navbarButton"
                  variant="contained"
                  color="secondary"
                  href="./login"
                >
                  login
                </Button>
              )}
            </Grid>
            <Grid item>
              {currentUser ? null : (
                <Button variant="outlined" color="secondary" href="./login">
                  signup
                </Button>
              )}
              {currentUser ? (
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  color="secondary"
                >
                  logout
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div
          className={classes.heroContent}
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1584967918940-a7d51b064268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80")`,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="secondary"
              gutterBottom
            >
              LOGO CODE NAME IDA
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "white", textShadow: "2px 2px 5px black" }}
            >
              Create your perfect Itinerary or take on an adventure made by one
              of our users
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                {/* <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid> */}
                {/* option 2 */}
                <div style={{ backgroundColor: "#004346", height: "5em" }}>
                  <SearchBar />
                </div>
              </Grid>
            </div>
          </Container>
        </div>
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
            Trending Topics
          </Typography>
          <Grid container spacing={5}>
            <HomeButtonCards trendingTopics={trendingTopics} />
          </Grid>
        </Container>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="Primary"
            id="section-name-Typ"
            // gutterBottom
          >
            Trending Itinerary
          </Typography>
          <Grid container spacing={5}>
            <HomeButtonCards trendingTopics={trendingTopics} />
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <hr />
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
      {/* {console.log(firebase.auth().currentUser)} */}
      {currentUser ? handleUser() : null}
    </>
  );
}
