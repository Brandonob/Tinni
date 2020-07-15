import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./features/Home/home";

import Login from "./features/Login/Login"

import ItineraryDisplayPage from "./features/Itinerary/SearchResultDisplayPage"


function App() {
  return (
    <div className="App">
      <Route exact path={"/home"}>
        <Homepage />
      </Route>
// <<<<<<< LoginPage
//       {<Route exact path={"/itinerary"}>
//         <Itinerarypage />
// =======
//        <Route exact path={"/itineraries"}>
//         <ItineraryDisplayPage/>
//       </Route>
//       <Route exact path={"/signup"}>
//         <SignUppage />
//       </Route>}
//       <Route exact path={"/login"}>
//         <Login />
//       </Route>
//       <Route exact path={"/login"}>
//         <Login />
//       </Route> 
    </div>
  );
}

export default App;
