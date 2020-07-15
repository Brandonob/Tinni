import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./features/Home/home";
import ItineraryDisplayPage from "./features/Itinerary/SearchResultDisplayPage"
// import Itinerary from "../../frontend/src/features/Itinerary/itinerary"

function App() {
  return (
    <div className="App">
      <Route exact path={"/home"}>
        <Homepage />
      </Route>
       <Route exact path={"/itineraries"}>
        <ItineraryDisplayPage/>
      </Route>
      {/* <Route exact path={"/signup"}>
        <SignUppage />
      </Route> */}
    </div>
  );
}

export default App;
