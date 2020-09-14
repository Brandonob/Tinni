import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { makeStyles } from "@material-ui/core/styles";
import Emailform from "../ShareItin/ShareItinForm";
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
  const { onClose, selectedValue, open, handleADD } = props;
  const classes = useStyles();

  const handleClick = () => {
    handleADD();
  };

  const handleCloseEmail = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleCloseEmail}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">login</DialogTitle>
      {/* <Login />
       */}
      <Emailform />
    </Dialog>
  );
};

export default SimpleDialog;
