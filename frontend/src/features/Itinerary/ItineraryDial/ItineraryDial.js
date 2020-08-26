import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Typography, TextField } from "@material-ui/core/";
import { blue } from "@material-ui/core/colors";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const SimpleDialog = (props) => {
  const { onClose, selectedValue, open, handleADD, setTime, time } = props;
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date("T21:11:54"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTime(date);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Pick a Time</DialogTitle>
      {/* <TextField
        placeholder="My Intinerary"
        id="EnterName"
        label="Enter Name"
      /> */}
      {/* <form> */}
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
      {/* <Grid container justify="space-around"> */}
      <div></div>
      <p>PICK A Time </p>
      <TextField
        id="time-local"
        label="Next appointment"
        type="time-local"
        defaultValue={time}
        onChange={(e) => {
          setTime(e.target.value);
        }}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* </Grid> */}
      {/* </MuiPickersUtilsProvider> */}
      <button onClick={handleADD}>Add</button>
      <div />
      {/* </form> */}
    </Dialog>
  );
};

export default SimpleDialog;
