import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { setBusiness } from "../BusinessInfo/BusinessInfoSlice";
import { updateModal, modalState } from "../Modal/ModalSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";
import itinerariesSlice from "../Itinerary/itinerarySlice";
import currentItinerarySlice from "../CurrentItinerary/currentItinerarySlice";
import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";

import "../CSS/result.css";
import { current } from "@reduxjs/toolkit";
const SearchResult = ({ result }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const currentItinerary = useSelector(selectCurrentItin);
  const {
    id,
    name,
    image_url,
    review_count,
    rating,
    categories,
    price,
    display_phone,
    latitude,
    longitude,
    location,
    term,
    category,
  } = result;

  const useStyles = makeStyles({
    root: {
      // maxWidth: 700,
      width: "200px",
    },
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addItinerary = async (e) => {
    e.preventDefault();

    let body = {
      location,
      latitude,
      longitude,
      location,
      term,
      category,
      name,
    };
    dispatch(addItemToItin(body));
    setOpen(true);
  };

  console.log(currentItinerary);
  return (
    //
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            className={"restaurantCard"}
            key={id}
            value={id}
          >
            {name}
            <img src={image_url} alt={"Restaurant"} id={"image"} />
          </Typography>

          <Typography variant="body2" color="black" component="p">
            <h2 id={"category"}>Category: {categories[0].title}</h2>
            <h2 id={"reviews"}>Reviews: {review_count}</h2>
            <h2 id={"rating"}>Rating: {rating}</h2>
            <h3 id={"price"}>Price: {price}</h3>
            <CardActions>
              <Button size="small" color="primary">
                More Info
              </Button>
              <Button onClick={addItinerary} size="small" color="primary">
                Add To Itinerary
              </Button>
            </CardActions>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          successfuly added!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default SearchResult;
