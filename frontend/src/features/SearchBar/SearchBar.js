import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LocationSearch from "./locationSearch";
import { receiveSearch } from "../SearchBar/SearchBarSlice";
import "./searchbar.css";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  Divider,
  // IconButton,
  Button,

  // InputLabel,
} from "@material-ui/core";

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
    color: "secondary",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY =
  // "8qnMAZ-CZ90tKgmGIL0GXzVK-teEHMAmfu0f-NlSKYgA-dSxs5WzkUz5DEu293l2ccgEUx9VMFEB3rMRMGXh0d7uU2cuybWSC91zVpq7-1l7Zq8LXBzoMVe9L8XvXnYx";
  "LFdo6C7hC-lOv9bETblPGtrgq3v7mv58fZYWAv9gQCSrfAWsFjfaB2zHEthT1WHpTcdJUaxGk7tBUyReInvmM672_yo2V2uQNS_fW5gKzzE7mOwKtUR21zESo14LX3Yx";
const SearchBar = () => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [term, setTerm] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchType, setSearchType] = useState("Places");
  const [loading, SetLoading] = useState(false);

  const locationURL = () => {
    if (location) {
      return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=50&sort_by=distance`;
    } else {
      return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&limit=50&sort_by=distance`;
    }
  };

  const searchPlaces = async (e) => {
    SetLoading(true);
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

      dispatch(receiveSearch(res.data.businesses));

      //new page
      SetLoading(false);
      history.push("/myitin");
    } catch (error) {
      SetLoading(true);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    if (searchType === "Places") {
      searchPlaces(e);
    } else if (searchType === "Events") {
    } else if (searchType === "Itineraries") {
    }
  };

  const handleChange = (e) => {
    setSearchType(e.target.value);
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
        <LocationSearch
          color="secondary"
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <Divider className={classes.divider} orientation="vertical" />

        <Button
          variant="contained"
          color="secondary"
          className={classes.iconButton}
          // fontColor="white"
          // outlined
          type="submit"
          // onClick={handleSubmit}
          // endIcon={<SearchIcon />}
          align="baseline"
        >
          Search
        </Button>
      </Paper>
    </>
  );
};

export default SearchBar;
