import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import sendSMS from "./send_sms";

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

const SimpleTextDialog = (props) => {
  const { onClose, selectedValue, open, handleADD } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleclick = () => {
    sendSMS();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Text</DialogTitle>
      <button onClick={handleclick}> text me my itin</button>
    </Dialog>
  );
};

export default SimpleTextDialog;
