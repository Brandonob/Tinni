import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LocationSearch from "./locationSearch";
import { receiveSearch } from "../SearchBar/SearchBarSlice";
import TextField from "@material-ui/core/TextField";
import "./searchbar.css";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY =
  "8qnMAZ-CZ90tKgmGIL0GXzVK-teEHMAmfu0f-NlSKYgA-dSxs5WzkUz5DEu293l2ccgEUx9VMFEB3rMRMGXh0d7uU2cuybWSC91zVpq7-1l7Zq8LXBzoMVe9L8XvXnYx";

const SearchBar = () => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [term, setTerm] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const locationURL = () => {
    if (location) {
      return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=50`;
    } else {
      return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&limit=50`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = locationURL();
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      let res = await axios(config);
      debugger;
      dispatch(receiveSearch(res.data.businesses));
      debugger;
      history.push("/itineraries");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <InputBase
          onChange={(e) => setTerm(e.currentTarget.value)}
          value={term}
          className={classes.input}
          placeholder="Search term"
          variant="outlined"
          // fullWidth="false"
          autoFocus="true"
        />
        <Divider className={classes.divider} orientation="vertical" />
        <LocationSearch setLatitude={setLatitude} setLongitude={setLongitude} />
        <Divider className={classes.divider} orientation="vertical" />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={handleSubmit}
        >
          <SearchIcon />
          <Typography
            component="small"
            variant="small"
            align="baseline"
            color="primary"
            margin="none"
          >
            Search
          </Typography>
        </IconButton>
      </Paper>
    </>
  );
};

export default SearchBar;
