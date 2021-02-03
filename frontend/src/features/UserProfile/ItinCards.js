import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import  itinpic from '../../images/itinpic.png';
import { useSelector } from "react-redux";
import { fetchItineraries, selectItins } from '../Itinerary/itinerarySlice'
import { selectUserID } from '../Users/usersSlice'
import ShareItinForm from '../ShareItin/ShareItinForm'

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
    const currentUserID = useSelector(selectUserID)

    const [showShareForm, setShowShareForm] = useState(false);
    const [currentItinID, setCurrentItinID] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchItineraries(currentUserID))
    },[])

    const handleCardClick = async (e) => {
      // e.preventDefault();
    }

  return (
    <>
    {currentItinID ? handleCardClick() : null}
    <Grid container spacing={3}></Grid>
      {console.log(itineraries)}
      {itineraries.map(el => {
        return (
          <Grid item xs={3}>
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={itinpic}
                title="Itinerary Pic"
                onClick={setCurrentItinID(el.id)}
              />
              <Typography gutterBottom variant="h5" component="h2">
                  {el.title}
                </Typography>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" >
                Edit
              </Button>
              <Button size="small" color="primary" onClick={() => setShowShareForm(true)}>
                Share
              </Button>
            </CardActions>
            </Card>
          </Grid>
        )
      })}
      {showShareForm ? <ShareItinForm/> : null}
    <Grid/>
    </>
  );
}