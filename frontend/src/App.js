import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./features/Home/home";
import Login from "./features/Login/Login"

function App() {
  return (
    <div className="App">
      <Route exact path={"/home"}>
        <Homepage />
      </Route>
      {/* <Route exact path={"/itinerary"}>
        <Itinerarypage />
      </Route> */}
      <Route exact path={"/login"}>
        <Login />
      </Route> 
    </div>
  );
}

export default App;
