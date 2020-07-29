import React, {useState} from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api"
import {formatRelative} from "date-fns"
import mapStyles from "./mapStyles"
import {receiveSearch, selectSearchResults} from "../SearchBar/SearchBarSlice"
import { useDispatch, useSelector } from "react-redux";




const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}
const center = {
  lat: 40.73,
  lng: -73.93
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
}

export default function App() {
  const searchResults = useSelector(selectSearchResults)
  const markers = searchResults.map((location) => {
    let {id, coordinates} = location

   if (location.rating > 3.5){
    return <Marker key={id} position={{lat: coordinates.latitude, lng: coordinates.longitude}}/>
   }  
  })

  console.log(searchResults)
  return <div>
  <h1>
    Codename Ida {" "} <span role="img" aria-label="world map">🗺</span>
  </h1>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={12}
    center={center}
    options={options}
    >
      {markers}
    </GoogleMap>
  </div>
}