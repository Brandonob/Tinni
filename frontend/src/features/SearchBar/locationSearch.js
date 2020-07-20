import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
// import AddLocationIcon from "@material-ui/icons/AddLocation";
// import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import { InputAdornment } from "@material-ui/core";
import { Typography, ListItem } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import LocationOnIcon from "@material-ui/icons/LocationOn";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
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

const LocationSearch = ({ setLatitude, setLongitude }) => {
  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [select, setSelect] = useState(false);

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleFocus = () => {
    setSelect(true);
  };
  const handleBlur = () => {
    setSelect(false);
  };
  const handleClick = () => {
    debugger;
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setAddress(value);
    setLatitude(latLng.lat);
    setLongitude(latLng.lng);
  };
  console.log(select);

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div id="searchDiv">
            <InputBase
              className={classes.input}
              placeholder="location"
              {...getInputProps({ placeholder: "Type address" })}
              onFocus={handleFocus}
            />

            {/* <input
              {...getInputProps({ placeholder: "Type address" })}
              onFocus={handleFocus}
            /> */}
            <div id="searchResultsDiv">
              {/* {select === true ? (
                <li onClick={handleClick}>use current location</li>
              ) : null} */}
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#068360" : "#fff",
                };
                debugger;
                return (
                  <ListItem
                    // component="small"
                    variant="p"
                    align="center"
                    color="primary"
                    margin="none"
                    id="searchResultItem"
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    <LocationOnIcon fontSize="small" />
                    {suggestion.description}
                  </ListItem>

                  /* <li {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </li> */
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        text="uselocation"
        onClick={handleClick}
      >
        <PersonPinCircleOutlinedIcon />
      </IconButton>
    </>
  );
};

export default LocationSearch;
