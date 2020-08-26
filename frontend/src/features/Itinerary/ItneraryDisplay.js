import React, { useState } from "react";
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 175,
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
  const [ItineraryDate, setItinerarydate] = useState("2020-08-23");
  const [editMode, setEditMode] = useState(false);

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

  const navButton = () => {
    return (
      <div id="navItin">
        <button>Review/Share itnerary</button>
        <button>Save itnerary</button>
      </div>
    );
  };

  return (
    <div style={{ marginTop: "10px" }} className={classes.root}>
      {/* <div className={classes.container}>
        <TextField
          name="ItineraryName"
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
        <TextField
          name="ItineraryDate"
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
      </div> */}
      <div class="box" style={{ padding: "10px" }}>
        <div class="mask"></div>
        <div class="top">
          <div class="menu but">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div class="search but">
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div class="time">
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
        </div>
        <div class="temp">
          79F<i class="wi wi-solar-eclipse"></i>
        </div>
        <div class="middle">
          {/* <span id="hi">My Iternary!</span> */}
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
          <ItneraryList />
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
