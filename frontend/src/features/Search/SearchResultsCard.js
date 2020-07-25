import React from "react"
import {useDispatch, useSelector} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {setBusiness} from "../BusinessInfo/BusinessInfoSlice"
import {updateModal, modalState} from "../Modal/ModalSlice"
import axios from "axios"
import {useHistory} from "react-router-dom"
import itinerariesSlice from "../Itinerary/itinerarySlice"
import currentItinerarySlice from "../CurrentItinerary/currentItinerarySlice"
import {addItemToItin, selectCurrentItin} from "../CurrentItinerary/currentItinerarySlice"



import "../CSS/result.css"
import { current } from "@reduxjs/toolkit";
const SearchResult = ({result})=>{
const currentItinerary = useSelector(selectCurrentItin)
    const{
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
        category
    } = result

    const useStyles = makeStyles({
      root: {
        maxWidth: 700,
      },
    });
    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()
    // const dispatch = useDispatch()
    // const isOpen = useSelector(modalState);

    // const handleClick = (e) => {
    //   dispatch(setBusiness(e.target.title));
    //   dispatch(updateModal(!isOpen));
    // };


    
    const addItinerary = async (e)=>{
      e.preventDefault()

      let body = {location,
                  latitude,
                  longitude,
                  location,
                  term, 
                  category,
                  name
       }
      dispatch(addItemToItin(body))
      // const currentItinerary = useSelector(currentItinerarySlice)
      //  console.log(currentItinerary)
     
      

      // const url = 'http://localhost:3001'
      // let itineraries = await axios.post(`${url}/itineraries`,{
      //   title: "myItinerary",
      //   user_id: 2,
      //   itinerary_id: '2020-07-07'
      // })

    
      
      // const url = 'http://localhost:3001/itineraryActivity'
      // debugger
      // try{
      //   await axios.post(url,{
      //     name:name
      //   })
      //   history.push("/itineraries")
      // }catch(err){
      //   console.log(err)
      // }
    }

    console.log(currentItinerary)
    return(
      //   <div className={"restaurantCard"} key={id} value={id}>
      //   <div className={"basicInfo"}>
      //     <h2 id={"name"} title={id}  value={id}>
      //       {name}
      //     </h2>
      //     <img src={image_url} alt={"Restaurant"} id={"image"} />
      //     <h2 id={"address"}>
      //      Address
      //     </h2>
      //     <h2 id={"phone"}>Contact: {display_phone}</h2>
      //   </div>
      //   <div className={"information"}>
      //     <h2 id={"category"}>Category: {categories[0].title}</h2>
      //     <h2 id={"reviews"}>Reviews: {review_count}</h2>
      //     <h2 id={"rating"}>Rating: {rating}</h2>
      //     <h3 id={"price"}>Price: {price}</h3>
      //   </div>
      //   <br/>
      // </div>
      <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={"restaurantCard"} key={id} value={id}>
            {name}
            <img src={image_url} alt={"Restaurant"} id={"image"}/>
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
        <Button onClick = {addItinerary}size="small" color="primary">
          Add To Itinerary
        </Button>
      </CardActions>
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
    
}

export default SearchResult