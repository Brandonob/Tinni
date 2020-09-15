import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { receiveSearch } from "../../SearchBar/SearchBarSlice";
// const images = [
//   {
//     url:
//       "https://www.thenewpotato.com/wp-content/uploads/2017/06/best-burger-new-york-2017.jpg",
//     title: "Brugers",
//     margin: "1px",
//     width: "30%",
//   },
//   {
//     url:
//       "https://upload.wikimedia.org/wikipedia/commons/7/72/Unisfera_Flushing.jpg",
//     title: "Parks",
//     width: "30%",
//     margin: "1px",
//     width: "30%",
//   },
//   {
//     url: "https://itsinqueens.com/wp-content/uploads/2019/08/MG_2910.jpg",
//     title: "Salsa",
//     margin: "1px",
//     width: "30%",
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const API_KEY =
  // "8qnMAZ-CZ90tKgmGIL0GXzVK-teEHMAmfu0f-NlSKYgA-dSxs5WzkUz5DEu293l2ccgEUx9VMFEB3rMRMGXh0d7uU2cuybWSC91zVpq7-1l7Zq8LXBzoMVe9L8XvXnYx";
  "LFdo6C7hC-lOv9bETblPGtrgq3v7mv58fZYWAv9gQCSrfAWsFjfaB2zHEthT1WHpTcdJUaxGk7tBUyReInvmM672_yo2V2uQNS_fW5gKzzE7mOwKtUR21zESo14LX3Yx";

export default function HomeButtonCards({ trendingTopics }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    const config = {
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${e.target.innerText}&location=manhattan&limit=50&sort_by=distance`,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      let res = await axios(config);

      dispatch(receiveSearch(res.data.businesses));

      //new page

      history.push("/myitin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root} style={{ justifyContent: "center" }}>
      {trendingTopics.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          id={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
            margin: image.margin,
          }}
          onClick={handleClick}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}
