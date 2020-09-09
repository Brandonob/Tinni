import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import reactLogo from '../../images/reactLogo.png';
import { useSelector } from "react-redux";
import { fetchItineraries, selectItins } from '../Itinerary/itinerarySlice'
import { selectUserID } from '../Users/usersSlice'

const useStyles = makeStyles({
    root: {
      maxWidth: 250,
    },
    media: {
      height: 200,
    },
  });

export const ItinCards = () => {
    const classes = useStyles();

    const itineraries = useSelector(selectItins);
    const currentUserID = useSelector(selectUserID)

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchItineraries(currentUserID))
    },[])

  return (
    <>
      {console.log(itineraries)}
      {itineraries.map(el => {
        return (
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={reactLogo}
              title="Contemplative Reptile"
            />
            <Typography gutterBottom variant="h5" component="h2">
                {el.title}
              </Typography>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Edit
            </Button>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
          </Card>
        )
      })}
  </>
  );
}