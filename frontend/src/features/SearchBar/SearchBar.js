import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LocationSearch from "./locationSearch";
import { receiveSearch } from "../SearchBar/SearchBarSlice";
import "./searchbar.css";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Button,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

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
  "8qnMAZ-CZ90tKgmGIL0GXzVK-teEHMAmfu0f-NlSKYgA-dSxs5WzkUz5DEu293l2ccgEUx9VMFEB3rMRMGXh0d7uU2cuybWSC91zVpq7-1l7Zq8LXBzoMVe9L8XvXnYx";

const SearchBar = () => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [term, setTerm] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchType, setSearchType] = useState("Places");

  const locationURL = () => {
    if (location) {
      return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=50&sort_by=distance`;
    } else {
      return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&limit=50&sort_by=distance`;
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

      dispatch(receiveSearch(res.data.businesses));

      // history.push("/ItinResPage");
      //new page
      history.push("/myitin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearchType(e.target.value);
  };
  return (
    <>
      {/* <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}
      {/* old */}
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        {/* <InputLabel id="demo-simple-select-filled-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={searchType}
          onChange={handleChange}
        >
          <MenuItem value="Places">Places</MenuItem>
          <MenuItem value="Events">Events</MenuItem>
          <MenuItem value="Itineraries">Itineraries </MenuItem>
        </Select>
        <Divider className={classes.divider} orientation="vertical" />
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

        {/* <IconButton
          // color="primary"
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSubmit}
          // variant="contained"
          color="secondary"
        >
          <SearchIcon />
          <Typography
            component="small"
            variant="small"
            align="baseline"
            // color="primary"
            // backgroundColor="secondary"
            margin="none"
          >
            Search
          </Typography>
        </IconButton> */}
        <Button
          variant="contained"
          color="secondary"
          className={classes.iconButton}
          // fontColor="white"
          // outlined
          onClick={handleSubmit}
          endIcon={<SearchIcon />}
          align="baseline"
        >
          Send
        </Button>
      </Paper>
    </>
  );
};

export default SearchBar;
