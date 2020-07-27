import React from "react";
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
import ItineraryList from "./ItineraryList";
import CustomizedMenus from "./openclose";
import Map from "../Map/Map";
import ItineraryDisplayPage from "./SearchResultDisplayPage";
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
const trendingTopics = [
  {
    url:
      "https://www.thenewpotato.com/wp-content/uploads/2017/06/best-burger-new-york-2017.jpg",
    title: "Brugers",
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

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const cards = [1, 2, 3];

export default function ItinResPage() {
  const classes = useStyles();

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
      <main>
        {/* <Container maxWidth="md"> */}
        {/* End hero unit */}
        {/* <ItineraryList /> */}
        {/* <CustomizedMenus /> */}
        {/* </Container> */}
        {/* <Map /> */}
        <div
          style={{
            width: "500px",
            height: "500px",
            position: "relative",
            paddingBottom: "20px",
          }}
        >
          <CustomizedMenus />
          <Map />
          <div></div>
        </div>
        {/* <Container className={classes.cardGrid} maxWidth="md"> */}
        {/* End hero unit */}
        {/* </Container> */}
      </main>
      {/* Footer */}
      <hr />
      <ItineraryDisplayPage />
      {/* <footer className={classes.footer}>
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
      </footer> */}
      {/* End footer */}
    </>
  );
}