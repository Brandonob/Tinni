import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import receiveSearch from "../SearchBar/SearchBarSlice";
import LocationSearch from "./locationSearch";
const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY =
//   "8qnMAZ-CZ90tKgmGIL0GXzVK-teEHMAmfu0f-NlSKYgA-dSxs5WzkUz5DEu293l2ccgEUx9VMFEB3rMRMGXh0d7uU2cuybWSC91zVpq7-1l7Zq8LXBzoMVe9L8XvXnYx";

const SearchBar = () => {
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

  const searchLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchLocation();
  }, []);

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
      debugger;
      let res = await axios(config);
      debugger;
      //   dispatch(receiveSearch(res.data.businesses));
      debugger;
      history.push("/itineraries");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="left_side_searchTerm_div">
          <input
            className="searchTerm"
            placeholder="search destinations"
            value={term}
            onChange={(e) => setTerm(e.currentTarget.value)}
          />
        </div>
        <div className="right_side_location_div">
          {/* <input
            className="location"
            placeholder="search location"
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
          /> */}
          <LocationSearch />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SearchBar;
