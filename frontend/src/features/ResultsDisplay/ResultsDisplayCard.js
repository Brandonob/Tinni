import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Collapse, Button } from "@material-ui/core/";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import SimpleDialog from "../Itinerary/ItineraryDial/ItineraryDial";
import "./ResultsDisplayCard.css";
import BusinessInfoDisplay from "../BusinessInfo/BusinessInfoDisplay";
import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "400px",
    marginBottom: "10px",
    marginLeft: "50px",
    backgroundColor: "#E6F0EE",
  },

  media: {
    height: 0,
    // maxWidth: 400,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function ResultsDisplayCard({
  image_url,
  id,
  name,
  address,
  latitude,
  longitude,
  term,
  distance,
  rating,
  cardNum,
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [opendia, setOpenDia] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const currentItinerary = useSelector(selectCurrentItin);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = () => {
    setOpenDia(true);
  };

  const handleADD = async () => {
    handleTime();
  };
  const handleTime = (value) => {
    let num = "" + Math.random().toString(36).substr(2, 9);
    // let id = latitude + longitude + "" + num++;
    let duration = hours * 60 + minutes;
    if (image_url === "") {
      image_url =
        "https://upload.wikimedia.org/wikipedia/commons/c/cf/Radio_City_Music_Hall_Panorama.jpg";
    }
    // hours * 60 + minutes
    let body = {
      latitude,
      longitude,
      address,
      term,
      name,
      id: num,
      image_url,
      time: {
        duration: duration,
        travelTo: 0,
        startTime: "",
        endTime: "",
      },
    };

    dispatch(addItemToItin(body));
    setHours(0);
    setMinutes(0);
    setOpenDia(false);
    setOpen(true);
    return currentItinerary;
  };

  //needed to add
  const handleDiaClose = (value) => {
    setOpenDia(false);
    // setSelectedValue(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Card
      className={classes.root}
      name={id}
      onmouseover="bigImg(this)"
      onmouseout="normalImg(this)"
    >
      <Typography gutterBottom variant="h6" component="h2">
        {cardNum} {name}
      </Typography>
      {image_url ? (
        <CardMedia className={classes.media} image={image_url} title={name} />
      ) : (
        <CardMedia
          className={classes.media}
          image={
            "https://static.techspot.com/images2/news/bigimage/2019/12/2019-12-19-image-2.png"
          }
          title={name}
        />
      )}
      <CardContent>
        <Typography variant="paragraph" color="textPrimary" component="p">
          Location: {address}
          <br></br>
          Rating: {rating}
          <br></br>
          Distance: {(distance * 0.00062137).toFixed(1)} mile
        </Typography>
        <Button
          id="addButton"
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          Add
          {/* <AddCircleSharpIcon onClick={handleClick} /> */}
        </Button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        {/* Alert */}
        <Snackbar
          open={open}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            success your stop has been added!
          </Alert>
        </Snackbar>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>Method:</Typography> */}

          <BusinessInfoDisplay id={id} />
          {/* if line 396 doesn't work use busineessinfodisplay */}
        </CardContent>
      </Collapse>
      {/* popup */}
      <SimpleDialog
        name={name}
        open={opendia}
        onClose={handleDiaClose}
        handleADD={handleADD}
        minutes={minutes}
        setMinutes={setMinutes}
        hours={hours}
        setHours={setHours}
      />
    </Card>
  );
}
