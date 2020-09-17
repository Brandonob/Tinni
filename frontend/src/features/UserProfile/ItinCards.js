import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import itinpic from "../../images/itinpic.png";
import { useSelector } from "react-redux";
import { fetchItineraries, selectItins } from "../Itinerary/itinerarySlice";
import { selectUserID } from "../Users/usersSlice";
import ShareItinForm from "../ShareItin/ShareItinForm";
import {
  clearItin,
  addInfo,
  addItemToItin,
} from "../CurrentItinerary/currentItinerarySlice";
import { useHistory } from "react-router-dom";
import { getAPI } from "../../util/utils";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 175,
  },
});

export const ItinCards = () => {
  const classes = useStyles();

  const itineraries = useSelector(selectItins);
  const currentUserID = useSelector(selectUserID);
  const history = useHistory();
  const [showShareForm, setShowShareForm] = useState(false);
  const API = getAPI();
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    dispatch(clearItin());
    debugger;
    dispatch(
      addInfo({
        id: itineraries[e.currentTarget.id].itinerary_id,
        title: itineraries[e.currentTarget.id].title,
        date: itineraries[e.currentTarget.id].itinerary_date.split("T")[0],
        time: itineraries[e.currentTarget.id].itinerary_starttime,
      })
    );

    console.log(itineraries[e.currentTarget.id]);
    fetchActivitesbyItineraries(itineraries[e.currentTarget.id].itinerary_id);

    history.push("/myitin");
  };

  const fetchActivitesbyItineraries = async (id) => {
    debugger;
    try {
      let results = await axios.get(`${API}/activites/itin/${id}`);
      debugger;
      results.data.payload.forEach((activity) => {
        let body = {
          latitude: activity.latitude,
          longitude: activity.longitude,
          address: activity.location,
          term: "",
          name: activity.activity_name,
          activity_id: activity.id,
          image_url: activity.image
            ? activity.image
            : "https://upload.wikimedia.org/wikipedia/commons/c/cf/Radio_City_Music_Hall_Panorama.jpg",
          time: {
            duration: activity.duration,
            travelTo: 0,
            startTime: activity.activity_starttime,
            endTime: activity.activity_endtime,
          },
        };

        dispatch(addItemToItin(body));
      });

      console.log("hi");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container spacing={3}></Grid>
      {console.log(itineraries)}
      {itineraries.map((el, i) => {
        return (
          <Grid item xs={3}>
            <Card className={classes.root} id={el.id} key={el.id}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={itinpic}
                  title="Itinerary Pic"
                  onClick={handleEdit}
                />
                <Typography gutterBottom variant="h5" component="h2">
                  {el.title} {el.date}
                </Typography>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleEdit}
                  id={i}
                  key={i}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => setShowShareForm(true)}
                >
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
      {showShareForm ? <ShareItinForm /> : null}
      <Grid />
    </>
  );
};
