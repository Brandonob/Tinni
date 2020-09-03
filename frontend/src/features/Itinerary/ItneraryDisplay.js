import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Badge } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ItneraryList from "./ItineraryList";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from "@material-ui/icons/Done";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";
import "./ItineraryDisplay.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: 150,
    color: "black",
    fontSize: 20,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
}));

export default function ItineraryDisplay() {
  const classes = useStyles();
  const currentItinerary = useSelector(selectCurrentItin);
  const [ItineraryName, setItineraryName] = useState("My Itinerary");
  const [ItineraryDate, setItinerarydate] = useState("");
  const [ItineraryTime, setItineraryTime] = useState("19:00");
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  useEffect(() => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + month + "-" + day;
    setItinerarydate(today);
  }, []);

  const handleChange = (event) => {
    debugger;
    `set${event.target.name}`(event.target.value);
  };

  const handleClick = () => {
    setEditMode(true);
  };
  const handleDone = () => {
    setEditMode(false);
  };

  const handleClickReview = () => {
    history.push("./user/itnerary");
  };
  const navButton = () => {
    return (
      <div id="navItin">
        <button onClick={handleClickReview}>Review</button>
        {/* <button>Save itnerary</button> */}
      </div>
    );
  };

  return (
    <div style={{ marginTop: "10px" }} className={classes.root}>
      <div class="box" style={{ width: "-webkit - fill - available" }}>
        <div class="mask"></div>

        <div class="top">
          <div class="menu but">
            <TextField
              name="ItineraryName"
              id="ItineraryName"
              // defaultValue={value}
              value={ItineraryName}
              margin="normal"
              onChange={(e) => setItineraryName(e.target.value)}
              disabled={!editMode}
              className={classes.textField}
              InputProps={{
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
          </div>
        </div>
        <div class="time" style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="ItineraryDate"
            id="ItineraryDate"
            type="date"
            value={ItineraryDate}
            margin="normal"
            onChange={(e) => {
              setItinerarydate(e.target.value);
            }}
            disabled={!editMode}
            className={classes.textField}
            InputProps={{
              classes: {
                disabled: classes.disabled,
              },
            }}
          />
          <TextField
            name="ItineraryDate"
            id="ItineraryDate"
            type="time"
            value={ItineraryTime}
            onChange={(e) => {
              setItineraryTime(e.target.value);
            }}
            margin="normal"
            disabled={!editMode}
            className={classes.textField}
            InputProps={{
              classes: {
                disabled: classes.disabled,
              },
            }}
          />
        </div>

        {/* <div class="temp">
          79F<i class="wi wi-solar-eclipse"></i>
        </div> */}
        <div class="middle">
          {editMode ? (
            <InputAdornment position="end">
              <IconButton onClick={handleDone}>
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <Edit />
              </IconButton>
            </InputAdornment>
          )}
          <ItneraryList time={ItineraryTime} />
          {currentItinerary.length ? (
            navButton()
          ) : (
            <p>Add Items to Itinerary</p>
          )}
        </div>
      </div>
    </div>
  );
}
