import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Badge } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import ItneraryList from "./ItineraryList";
import { useSelector } from "react-redux";
import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     "&:focus": {
//       backgroundColor: theme.palette.primary.main,
//       "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
//         color: theme.palette.common.white,
//       },
//     },
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }))(MenuItem);
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export default function CustomizedMenus() {
  const classes = useStyles();
  const currentItinerary = useSelector(selectCurrentItin);

  const [anchorEl, setAnchorEl] = useState(null);

  const navButton = () => {
    return (
      <>
        <button>Review/Share itnerary</button>
        <button>Save itnerary</button>
      </>
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginTop: "10px" }} className={classes.root}>
      <Badge badgeContent={currentItinerary.length} color="Secondary">
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          View Itinerary
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ItneraryList />
          {currentItinerary.length ? (
            navButton()
          ) : (
            <p>Add Items to Itinerary</p>
          )}
        </StyledMenu>
      </Badge>
    </div>
  );
}
