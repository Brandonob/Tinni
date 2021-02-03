import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, config, uiConfig } from "../../util/firebaseFunction";
import { addUser } from "../Users/usersSlice";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAPI } from "../../util/utils";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logoText from "../../logoText.png";
import logoImg from "../../logoImg4.png";
import SearchBar from "../SearchBar/SearchBar.js";
import { selectInfo, logOutUser } from "../Users/usersSlice";
import { useSelector } from "react-redux";
import MenuDropDown from "../MenuDropDown";
import Container from "@material-ui/core/Container";
import MenuBar from "../Nav";
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Tinni
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const userInformation = useSelector(selectInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  const API = getAPI();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    dispatch(logOutUser());
    history.push("/");
    //call other actions to clear react state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login(email, password);
      console.log("you have succesfully logged in");
      let user = res.user.uid;
      dispatch(addUser(res.user.uid));

      history.push("/userprofile");
    } catch (error) {
      setErrMessage(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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

          <SearchBar />
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
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar style={{ margin: 25 }} className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <Box mt={8}>
        <Copyright />
      </Box>
      {console.log(errMessage)}
    </Container>
  );
};
export default Login;
