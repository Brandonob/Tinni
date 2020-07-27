// import React, {Component} from 'react';
// import {Map, Marker, GoogleApiWrapper} from "google-maps-react"
// import './map.css'

// const mapStyles = {
//   width: "100%",
//   height: "100%"
// }

// export class MapContainer extends Component {
//   render () {
//     return (
//       <Map 
//       google={this.props.google}
//       zoom={14}
//       style={mapStyles}
//       center={{
//         lat: 40.73,
//         lng: -73.93
//       }}
//     >
//      <Marker
//     title={'The marker`s title will appear as a tooltip.'}
//     name={'SOMA'}
//     position={{lat: 40.73, lng: -73.93}} />
//     </Map>
//     )
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBOgDVbsv4IKyKnKiZnsM0A-6nJSwFa9XY"
// })(MapContainer)

import React from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api"
import {formatRelative} from "date-fns"
import mapStyles from "./mapStyles"
const libraries = ["places"]
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
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })
  
  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading maps"
  return <div>
  <h1>
    Codename Ida {" "} <span role="img" aria-label="world map">🗺</span>
  </h1>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={12}
    center={center}
    options={options}
    ></GoogleMap>
  </div>
}