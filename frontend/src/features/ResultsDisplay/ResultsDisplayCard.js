// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import { Collapse, Button } from "@material-ui/core/";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
// import { SnackbarProvider, useSnackbar } from "notistack";
// import { useDispatch, useSelector } from "react-redux";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import {setBusiness} from "../BusinessInfo/BusinessInfoSlice"
// import { updateModal, modalState } from "../BusinessModal/ModalSlice"
// import ModalDisplay from "../BusinessModal/ModalDisplay"
// import BusinessInfo from "../BusinessInfo/BusinessInfo"
// import BusinessInfoDisplay from "../BusinessInfo/BusinessInfoDisplay"
// import "../../Default_Pics/food.jpeg"

// import {
//   addItemToItin,
//   selectCurrentItin,
// } from "../CurrentItinerary/currentItinerarySlice";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 200,
//     // height: 375,
//     // fontSize: "10px",
//     marginBottom: "10px",
//     backgroundColor: "#E6F0EE",
//   },

//   media: {
//     height: 0,
//     paddingTop: "56.25%", // 16:9
//   },
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: "rotate(180deg)",
//   },
// }));

// export default function ResultsDisplayCard({
//   image_url,
//   id,
//   name,
//   address,
//   latitude,
//   longitude,
//   term,
//   distance,
//   rating,
// }) {
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const [expanded, setExpanded] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);

//   };
//   const handleClick = () => {
//     let num = "" + Math.random().toString(36).substr(2, 9);
//     // let id = latitude + longitude + "" + num++;
//     let body = {
//       latitude,
//       longitude,
//       address,
//       term,
//       name,
//       id: num,
//     };
//     dispatch(addItemToItin(body));
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };

//   const isOpen = useSelector(modalState)

//   const handleMoreInformation = (e)=>{
//     dispatch(setBusiness(e.target.title))
//     dispatch(updateModal(!isOpen))
//   }

//     return (
//        <SnackbarProvider maxSnack={3}>
//       <Card className={classes.root} id={id}>
//         <Typography gutterBottom variant="h6" component="h2">
//           {name}
//         </Typography>
//           <CardMedia className={classes.media} image={"https://static.techspot.com/images2/news/bigimage/2019/12/2019-12-19-image-2.png"} title={name} />

//         <CardMedia className={classes.media} image={image_url} title={name} />
//         <CardContent>
//           <Typography variant="paragraph" color="textPrimary" component="p">
//             Location: {address}
//             <br></br>
//             Rating: {rating}
//             <br></br>
//             Distance: {(distance * 0.00062137).toFixed(1)} mile
//           </Typography>
//         </CardContent>
//         <CardActions disableSpacing>
//           <IconButton
//             className={clsx(classes.expand, {
//               [classes.expandOpen]: expanded,
//             })}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//           >
//             <ExpandMoreIcon />
//           </IconButton>
//           <Button variant="contained" color="secondary" onClick={handleClick}>
//             Add
//             {/* <AddCircleSharpIcon onClick={handleClick} /> */}
//           </Button>
//           <Snackbar
//             open={open}
//             autoHideDuration={1000}
//             anchorOrigin={{ vertical: "top", horizontal: "left" }}
//             onClose={handleClose}
//           >
//             <Alert onClose={handleClose} severity="success">
//               This is a success message!
//             </Alert>
//           </Snackbar>

//           {/* <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton> */}
//           {/* <IconButton
//           className={clsx(classes.expand, {
//             [classes.expandOpen]: expanded
//           })}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton> */}

//             <Typography variant="body2" color="textPrimary" component="p">
//               {/* <button onClick = {handleMoreInformation}>more information</button> */}
//             <ModalDisplay/>

//             </Typography>
//             <BusinessInfoDisplay id={id}/>

//           </CardContent>
//         </Collapse>
//       </Card>
//     );
//   }

// }
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Collapse, Button } from "@material-ui/core/";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import SimpleDialog from "../Itinerary/ItineraryDial/ItineraryDial";
import "./ResultsDisplayCard.css";
import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    // height: 375,
    // fontSize: "10px",
    marginBottom: "10px",
    backgroundColor: "#E6F0EE",
  },

  media: {
    height: 0,
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = () => {
    let num = "" + Math.random().toString(36).substr(2, 9);
    // let id = latitude + longitude + "" + num++;
    let body = {
      latitude,
      longitude,
      address,
      term,
      name,
      id: num,
    };
    dispatch(addItemToItin(body));
    setOpen(true);
    setOpenDia(true);
  };

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
    <Card className={classes.root} id={id}>
      {/* <CardHeader
        // variant="h6"
        component="paragraph"
        // font-size="10px"

        subheader="Shrimp and Chorizo Paella"
      /> */}
      <Typography gutterBottom variant="h6" component="h2">
        {" " + name}
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

        <Snackbar
          open={open}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>

        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>Method:</Typography> */}

          <Typography variant="body2" color="textPrimary" component="p">
            more information
          </Typography>
        </CardContent>
      </Collapse>
      <SimpleDialog open={opendia} onClose={handleDiaClose} />
    </Card>
  );
}
