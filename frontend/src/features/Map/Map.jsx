import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from "google-maps-react"

const mapStyles = {
  width: "100%",
  height: "100%"
}

export class MapContainer extends Component {
  render () {
    return (
      <Map 
      google={this.props.google}
      zoom={14}
      style={mapStyles}
      intialCenter={{
        lat: 42.966300,
        lng: -74.582570
      }}
    />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBOgDVbsv4IKyKnKiZnsM0A-6nJSwFa9XY"
})(MapContainer)