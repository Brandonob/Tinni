import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar.js";
import firebase from "firebase/app";
import { selectInfo, addInfo, addUser, selectUserID } from '../Users/usersSlice'
import { useDispatch } from "react-redux";
import { getAPI } from '../../util/utils'
import axios from 'axios'
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Link,
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import UserItin from "./UserItin";
import { ItinCards } from "./ItinCards"
// import {
//   addItemToItin,
//   selectCurrentItin,
// } from "../CurrentItinerary/currentItinerarySlice";

// import HomeButtonCards from "./homecomponents/homecards";
// import "./home.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/home">
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
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
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
  const userInformation = useSelector(selectInfo);
  const currentUserID = useSelector(selectUserID);
  const [currentUser, setCurrentUser] = useState("");
  const [userExists, setUserExists] = useState(false);
// debugger
  const dispatch = useDispatch();
  
  const API = getAPI();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User has successfully logged in!");
        setCurrentUser(user);
        getAllUsers()
        checkDBForUser(user)
      }
    });
  }, []);

  const checkDBForUser = async (user) => {
    console.log("function hit");
    
    try {
      // debugger
        console.log("userId being passed", user.uid);
        let res = await axios.get(`${API}/users/${user.uid}`)
        if(res.data.payload.length) {
          setUserExists(true)
        } else {
          // debugger
          signUserUp(user)
        }
        // res.data.payload.length ? setUserExists(true) : signUserUp()
        
        } catch (error) {
        console.log(error)
        
    }
  }

  const signUserUp = async (user) => {
    debugger
    try {
      let {
        displayName,
        email,
        phoneNumber,
        photoURL
      } = user.providerData[0]

      await axios.post(`${API}/users/`, {    //signup auth user
        id: user.uid,
        first_name: displayName,
        last_name: "",
        email: email,
        password: "",
        phone: phoneNumber,
        location: "",
        profile_pic: photoURL
    });

    } catch (error) {
      console.log(error.message)
    }
  }

  const getAllUsers = async() => {
    try {
      let res = await axios.get(`${API}/users/`)
      console.log(res);
      // debugger
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    setCurrentUser("");
    //call other actions to clear react state
  };

  const handleUser = () => {
    dispatch(addUser(currentUser.uid));
    dispatch(addInfo(currentUser.providerData[0]))
    
    // calls to save user into backend
  };

  return (
    <>
    {/* {currentUser ? checkDBForUser : null} */}
    {console.log("is user in db", userExists)}
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon className={classes.icon} /> */}
          {/* <Typography variant="h6" color="inherit" noWrap>
                                                CodeName IDA
                                            </Typography> */}
          <Typography variant="h6" color="inherit">
            <Link href="/home">codenameIDA</Link>
            <Link href="/home">codenameIDA</Link>
          </Typography>

          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <SearchBar />
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
      <main style={{ display: "flex", boxSizing: "border-box" }}>
        <div style={{ overflow: "scroll", 
                      height: "1000px",
                       }}>
          <Avatar
            alt="Remy Sharp"
            src={userInformation.photoURL}
            className={classes.orange}
          >
            
          </Avatar>
          <div style={{ marginTop: "10px" }}>
            {/* <Typography variant="h4">BIO</Typography> */}
              <Typography>Name: {userInformation.displayName}</Typography>
            {/* <Typography>Favortive Spot:Long Island City Piers </Typography> */}
            {/* <Typography>Number of Adventures:3 </Typography> */}
            {/* <Typography>DOB: January 8</Typography> */}
          </div>
        </div>

        {/* <Map /> */}
        <div
          style={{
            width: "550px",
            height: "500px",
            position: "relative",
            paddingBottom: "20px",
            marginLeft: "150px",
          }}
        >
          {/* {/* <CustomizedMenus /> */}
          <ItinCards/>
          {/* <UserItin /> */}
        </div>
        {/* <Container className={classes.cardGrid} maxWidth="md"> */}
        {/* End hero unit */}
        {/* </Container> */}
      </main>
      {/* Footer */}
      <hr />
      {/* <ItineraryDisplayPage /> */}
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
      End footer
      {currentUser ? handleUser() : null}
      {console.log(userInformation)}
    </>
  );
}
