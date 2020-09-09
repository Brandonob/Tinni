import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core/";
import { blue } from "@material-ui/core/colors";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
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
  const {
    onClose,
    selectedValue,
    open,
    handleADD,
    setTime,
    time,
    name,
    mintues,
    setMintues,
    hours,
    setHours,
  } = props;
  const classes = useStyles();

  const handleClick = () => {
    handleADD();
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
      <DialogTitle id="simple-dialog-title">Duration</DialogTitle>

      <p style={{ padding: "10px" }}>How long will you be at {name} ? </p>

      <div style={{ padding: "10px" }}>
        <FormControl style={{ width: "100px" }} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">hours</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={hours}
            onChange={(e) => {
              setHours(e.target.value);
            }}
            label="Hours"
          >
            <MenuItem value={0}>{0}</MenuItem>
            <MenuItem value={1}>{1}</MenuItem>
            <MenuItem value={2}>{2}</MenuItem>
            <MenuItem value={3}>{3}</MenuItem>
            <MenuItem value={4}>{4}</MenuItem>
            <MenuItem value={5}>{5}</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "100px" }} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Mintues
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={mintues}
            onChange={(e) => {
              setMintues(e.target.value);
            }}
            label="Mintues"
          >
            <MenuItem value={0}>{0}</MenuItem>
            <MenuItem value={5}>{5}</MenuItem>
            <MenuItem value={10}>{10}</MenuItem>
            <MenuItem value={15}>{15}</MenuItem>
            <MenuItem value={20}>{20}</MenuItem>
            <MenuItem value={25}>{25}</MenuItem>
            <MenuItem value={30}>{30}</MenuItem>
            <MenuItem value={35}>{35}</MenuItem>
            <MenuItem value={40}>{40}</MenuItem>
            <MenuItem value={45}>{45}</MenuItem>
            <MenuItem value={50}>{50}</MenuItem>
            <MenuItem value={55}>{55}</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        id="addButton"
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Add
      </Button>
    </Dialog>
  );
};

export default SimpleDialog;
