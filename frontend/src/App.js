import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./features/Home/home";

import Login from "./features/Login/Login";
import Signup from "./features/Login/Signup";
import ItineraryDisplayPage from "./features/Itinerary/SearchResultDisplayPage";
import MapContainer from "./features/Map/Map"
function App() {
  return (
    <div className="App">
      <Route exact path={"/home"}>
        <Homepage />
      </Route>
      <Route exact path={"/itineraries"}>
        <ItineraryDisplayPage />
      </Route>
      <Route exact path={"/signup"}>
        <Signup />
      </Route>
      <Route exact path={"/login"}>
        <Login />
      </Route>
      <Route exact path ={"/map"}>
        <MapContainer/>
      </Route>
    </div>
  );
}

export default App;
