import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./features/Home/home";
import ItineraryDisplayPage from "../../frontend/src/features/Itinerary/itineraryDisplayPage"

function App() {
  return (
    <div className="App">
      <Route exact path={"/home"}>
        <Homepage />
      </Route>
       <Route exact path={"/itinerary"}>
        <ItineraryDisplayPage/>
      </Route>
      {/* <Route exact path={"/signup"}>
        <SignUppage />
      </Route> */}
    </div>
  );
}

export default App;
