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

const mapContainerStyle = {
  width: "100vw",
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

export default function App() {
  const searchResults = useSelector(selectSearchResults);
  const curatedSearchResults = searchResults.filter(location => location.rating > 3.5)
  const [selected, setSelected] = useState(null)


  const markers = curatedSearchResults.map((location, i = 0) => {
    let {id, coordinates, name} = location
    return <Marker key={id} position={{lat: coordinates.latitude, lng: coordinates.longitude}} label={`${i + 1}`} title={name} onClick={() => {
      setSelected(location)
    }}/>  
  })

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
        {selected ? (<InfoWindow position={{lat: selected.coordinates.latitude, lng: selected.coordinates.longitude}} onCloseClick={() => setSelected(null)}>
          <h2>{selected.name}</h2>
        </InfoWindow>) : null}
      </GoogleMap>
    </div>
  );
}
