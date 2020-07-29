import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar.js";
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
import CustomizedMenus from "./openclose";
import Map from "../Map/Map";

import ItineraryDisplayPage from "../Search/SearchResultDisplayPage";

import ResultsDisplayCard from "../ResultsDisplay/ResultsDisplayCard";

import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";

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
  const currentItinerary = useSelector(selectCurrentItin);

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
            <Link href="/home">codenameIDA</Link>
            <Link href="/home">codenameIDA</Link>
          </Typography>

          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <SearchBar />
            </Grid>
            <Grid item>
              <Button
                id="navbarButton"
                variant="contained"
                color="secondary"
                href="./login"
              >
                login
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" href="./login">
                signup
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main style={{ display: "flex", boxSizing: "border-box" }}>
        <div style={{ overflow: "scroll", height: "1000px" }}>
          <ItineraryDisplayPage />
        </div>
        <CustomizedMenus />
        {/* <Map /> */}
        <div
          style={{
            width: "500px",
            height: "500px",
            position: "relative",
            paddingBottom: "20px",
          }}
        >
          {/* {/* <CustomizedMenus /> */}
          <Map />
          <div></div>
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
    </>
  );
}
