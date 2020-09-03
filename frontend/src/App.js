import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./features/Home/home";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import ItinResPage from "./features/Itinerary/ItinResPage";
import Login from "./features/Login/Login";
import Signup from "./features/Login/Signup";
import UserProfile from "./features/UserProfile/UserProfile";
// import ItineraryDisplayPage from "./features/Itinerary/SearchResultDisplayPage";
import MapContainer from "./features/Map/Map";
import MyItin from "./features/Itinerary/NewitinDisplayPage";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Route exact path={"/home"}>
          <Homepage />
        </Route>
        {/* <Route exact path={"/search"}>
          <ItineraryDisplayPage />
        </Route> */}
        <Route exact path={"/signup"}>
          <Signup />
        </Route>
        <Route exact path={"/login"}>
          <Login />
        </Route>
        <Route exact path={"/ItinResPage"}>
          <ItinResPage />
        </Route>
        <Route exact path={"/userprofile"}>
          <UserProfile />
        </Route>
        <Route exact path={"/myItin"}>
          <MyItin />
        </Route>
        <Route exact path={"/user/itnerary"}>
          <MyItin />
        </Route>
      </ThemeProvider>
      <Route exact path={"/map"}>
        <MapContainer />
      </Route>
    </div>
  );
}

export default App;
