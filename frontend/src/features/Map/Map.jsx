import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from "./mapStyles";
import {
  receiveSearch,
  selectSearchResults,
} from "../SearchBar/SearchBarSlice";
import { useDispatch, useSelector } from "react-redux";
import MarkerIcon from "../../Default_Pics/marker.svg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import SimpleDialog from "../Itinerary/ItineraryDial/ItineraryDial";
import { addItemToItin } from "../CurrentItinerary/currentItinerarySlice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapContainerStyle = {
  // width: "100vw",
  height: "100vh",
};
const defaultCenter = {
  lat: 40.73,
  lng: -73.93,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
};

export default function App({ selected, setSelected }) {
  const searchResults = useSelector(selectSearchResults);
  const curatedSearchResults = searchResults.filter(
    (location) => location.rating > 3.5
  );
  const [opendia, setOpenDia] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDiaClose = (value) => {
    setOpenDia(false);
    // setSelectedValue(value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //opens dialogue box
  const handleClick = () => {
    setOpenDia(true);
  };
  //add to itinerary and closes dialogue box
  const handleADD = () => {
    let num = "" + Math.random().toString(36).substr(2, 9);
    // let id = latitude + longitude + "" + num++;
    let duration = hours * 60 + minutes;
    // hours * 60 + minutes
    let body = {
      latitude: selected.coordinates.latitude,
      longitude: selected.coordinates.longitude,
      address: `${selected.location.display_address[0]} ${selected.location.display_address[1]}`,
      name: selected.name,
      id: num,
      time: {
        duration: duration,
        travelTo: 0,
      },
    };
    dispatch(addItemToItin(body));
    setHours(0);
    setMinutes(0);
    setOpenDia(false);
    setOpen(true);
  };

  const markers = curatedSearchResults.map((loc, i = 0) => {
    let { id, coordinates, name } = loc;

    return (
      <Marker
        key={id}
        position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
        icon={{
          url: MarkerIcon,
          scaledSize: new window.google.maps.Size(55, 55),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(27, 27),
        }}
        label={`${i + 1}`}
        title={name}
        onClick={() => {
          setSelected(loc);
        }}
      />
    );
  });

  const findSearchCenter = () => {
    return {
      lat: curatedSearchResults[0].coordinates.latitude,
      lng: curatedSearchResults[0].coordinates.longitude,
    };
  };

  return (
    <div>
      {/* <h1>
    Codename Ida {" "} <span role="img" aria-label="world map">🗺</span>
  </h1> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={
          curatedSearchResults.length ? findSearchCenter() : defaultCenter
        }
        options={options}
      >
        {markers}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.coordinates.latitude,
              lng: selected.coordinates.longitude,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{selected.name}</h2>
              <p>
                <center>
                  {selected.location.display_address[0]}
                  <br />
                  {selected.location.display_address[1]}
                </center>
              </p>
              <button onClick={handleClick}>Add</button>
              <Snackbar
                open={open}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  This is a success message!
                </Alert>
              </Snackbar>
              <SimpleDialog
                name={selected.name}
                open={opendia}
                onClose={handleDiaClose}
                handleADD={handleADD}
                minutes={minutes}
                setMinutes={setMinutes}
                hours={hours}
                setHours={setHours}
              />
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
