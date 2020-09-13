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

  const accountSid = "";
  const authToken = "";

  const client = require("twilio")(accountSid, authToken);
  const sendSMS = () => {
    client.messages
      .create({
        body: `First stop  https://www.google.com/maps/search/?api=1&query=40.7505045,-73.9934387
        second stop  https://www.google.com/maps/search/?api=1&query=40.7505045,-73.9934387
        third stop  https://www.google.com/maps/search/?api=1&query=40.7505045,-73.9934387`,
        from: "+12058838702",
        to: "+13472338279",
      })
      .then((message) => console.log(message.sid));
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
