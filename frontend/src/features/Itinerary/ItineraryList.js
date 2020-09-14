/////////////////////////////////////////////////////////////////////

import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateItin } from "../CurrentItinerary/currentItinerarySlice";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import SubwayTwoToneIcon from "@material-ui/icons/SubwayTwoTone";
// import LocalTaxiTwoToneIcon from "@material-ui/icons/LocalTaxiTwoTone";
// import DirectionsWalkTwoToneIcon from "@material-ui/icons/DirectionsWalkTwoTone";
import {
  reorder,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./ItineraryList.css";
import { makeStyles } from "@material-ui/core/styles";

const getItemStyle = (isDragging, draggableStyle) => ({
  paddingLeft: "px",

  // styles we need to apply on draggables
  ...draggableStyle,
  background: isDragging ? "#E6F0EE" : "#66ccaf",
});
const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
  },
  inline: {
    display: "inline",
  },
}));

const ItneraryList = ({ time }) => {
  const dispatch = useDispatch();
  const currentItinerary = useSelector(selectCurrentItin);
  const [show, setShow] = useState("block");
  // const [hours, setHours] = useState(0);
  // const [endTime, setEndTime] = useState(0);
  const classes = useStyles();

  // delete item from currentItinerary
  const deleteItin = (e) => {
    dispatch(updateItin(e.currentTarget.id));
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    setShow("none");
    if (!result.destination) {
      return;
    }
    //dropped inside
    let startIndex = result.source.index;
    let endIndex = result.destination.index;

    dispatch(reorder({ startIndex, endIndex }));
    setShow("block");
  };

  //time display
  const convertTimeDisplay = (time) => {
    let timeRes = time.split(":");

    if (parseInt(timeRes[0]) > 12) {
      timeRes[0] = parseInt(timeRes[0]) - 12;
      timeRes[2] = "pm";
    } else {
      timeRes[2] = "am";
    }
    if (parseInt(timeRes[1]) === 0) {
      parseInt((timeRes[1] = "00"));
    }
    return timeRes[0] + ":" + timeRes[1] + timeRes[2];
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div id="listDiv" ref={provided.innerRef}>
            {currentItinerary.map((item, index) => (
              <Draggable
                key={item.body.id}
                draggableId={item.body.id}
                index={index}
                id="listItem"
              >
                {(provided, snapshot) => (
                  <ListItem
                    id="listItinItem"
                    // ContainerComponent="li"
                    ContainerProps={{ ref: provided.innerRef }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={
                      ({ color: "white" },
                      getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      ))
                    }
                  >
                    <img
                      alt="Remy Sharp"
                      style={{
                        paddingTop: "20px",
                        paddingRight: "5px",
                        height: "50px",
                        width: "50px",
                      }}
                      src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Radio_City_Music_Hall_Panorama.jpg"
                    />

                    <ListItemText
                      primary={item.body.name}
                      secondary={
                        <div>
                          <Typography
                            component="span"
                            variant="paragraph"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            From: {convertTimeDisplay(item.body.time.startTime)}{" "}
                            - To {convertTimeDisplay(item.body.time.endTime)}
                          </Typography>

                          <div>
                            <Typography
                              component="span"
                              variant="paragraph"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              Duration: {item.body.time.duration} min.
                            </Typography>

                            {/* {" I'll be in your neighborhood doing errands this…"} */}
                          </div>

                          <div>
                            <Typography
                              component="span"
                              variant="paragraph"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {item.body.address}
                            </Typography>
                          </div>
                        </div>
                      }
                    />
                    <ListItemSecondaryAction onClick={deleteItin} id={index}>
                      <HighlightOffIcon edge="end" />
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ItneraryList;
