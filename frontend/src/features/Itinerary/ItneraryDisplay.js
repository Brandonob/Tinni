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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    color: "black",
    fontSize: 30,
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
      <>
        <button>Review/Share itnerary</button>
        <button>Save itnerary</button>
      </>
    );
  };

  return (
    <div style={{ marginTop: "10px" }} className={classes.root}>
      <div className={classes.container}>
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
      </div>

      <ItneraryList />
      {currentItinerary.length ? navButton() : <p>Add Items to Itinerary</p>}
    </div>
  );
}
