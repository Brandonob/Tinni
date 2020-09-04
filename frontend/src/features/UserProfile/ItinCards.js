import React from 'react';
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
import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";

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
    const itineraries = useSelector(selectCurrentItin);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={reactLogo}
          title="Contemplative Reptile"
        />
        <Typography gutterBottom variant="h5" component="h2">
            React
          </Typography>
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent> */}
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
  );
}