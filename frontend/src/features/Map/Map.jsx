import React, {useState} from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api"
import {formatRelative} from "date-fns"
import mapStyles from "./mapStyles"
import {receiveSearch} from "../SearchBar/SearchBarSlice"
import { useDispatch } from "react-redux";




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

  const [markers, setMarkers] = useState([])
  const dispatch = useDispatch()
  return <div>
  <h1>
    Codename Ida {" "} <span role="img" aria-label="world map">🗺</span>
  </h1>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={12}
    center={center}
    options={options}
    onClick = {(e) => {
      setMarkers(current => [...current, {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date()
      }])
    }}
    >
      {markers.map(marker => <Marker key={marker.time.toISOString()} position={{lat: marker.lat, lng: marker.lng}}/>)}
    </GoogleMap>
  </div>
}