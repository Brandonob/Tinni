/////////////////////////////////////////////////////////////////////

import React, { Component, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateItin } from "../CurrentItinerary/currentItinerarySlice";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import TimelineDot from "@material-ui/lab/TimelineDot";
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import SubwayTwoToneIcon from "@material-ui/icons/SubwayTwoTone";
import LocalTaxiTwoToneIcon from "@material-ui/icons/LocalTaxiTwoTone";
import DirectionsWalkTwoToneIcon from "@material-ui/icons/DirectionsWalkTwoTone";
import {
  reorder,
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TimeDisplay from "./ItineraryTime/ItineraryTimeDisplay";
import "./ItineraryList.css";

let addednum = 0;
const getItemStyle = (isDragging, draggableStyle) => ({
  paddingLeft: "0px",
  // styles we need to apply on draggables
  ...draggableStyle,

  // ...(isDragging && {
  //   background: "rgb(235,235,235)",
  // }),

  background: isDragging ? "#E6F0EE" : "#3ac9a1",
});

const functios = () => {
  console.log("hi");
  // background: isDraggingOver ? "lightblue" : "lightgrey",
};

const ItneraryList = ({ time }) => {
  const dispatch = useDispatch();
  const currentItinerary = useSelector(selectCurrentItin);
  const [show, setShow] = useState("block");
  const [hours, setHours] = useState(0);
  const [endTime, setEndTime] = useState(0);

  // delete item from currentItinerary
  const deleteItin = (e) => {
    dispatch(updateItin(e.currentTarget.id));
  };

  // const stopTime = (min, time) => {
  //   // target.setHours(Number(time[0] + time[1]), Number(time[2] + time[3]));

  //   target.setMinutes(target.getMinutes() + min);

  //   return (
  //     <p>{time + " - " + target.getHours() + ":" + target.getMinutes()}</p>
  //   );
  //   // console.log("time is " + target.getHours() + ":" + target.getMinutes());
  // };

  const onDragEnd = (result) => {
    // dropped outside the list
    setShow("none");
    if (!result.destination) {
      return;
    }
    let startIndex = result.source.index;
    let endIndex = result.destination.index;

    dispatch(reorder({ startIndex, endIndex }));
    setShow("block");
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
                    style={{ marginBottom: "10px" }}
                    // ContainerComponent="li"
                    ContainerProps={{ ref: provided.innerRef }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <p style={{ color: "white" }}>
                      {/* {`${index + 1}start:${item.body.time.duration} - End:${
                        item.body.time.duration
                      }  :`} */}
                      {` Duration: ${index + 1}start:${
                        item.body.time.duration
                      }`}
                    </p>
                    {/* <p
                      style={{ color: "white" }}
                    >{` End:${item.body.time.duration}`}</p> */}
                    <ListItemText />
                    <p style={{ color: "white" }}> {`  ${item.body.name}`}</p>
                    {/* {stopTime((addedMin += item.body.time), time)} */}
                    {/* <TimeDisplay
                        min={(addednum += item.body.time.duration)}
                        time={time}
                        endTime={endTime}
                        setEndTime={setEndTime}
                      /> */}
                    <br></br>
                    <IconButton onClick={deleteItin} id={index}>
                      <HighlightOffIcon />
                    </IconButton>
                    <ListItemSecondaryAction>
                      {/* <DirectionsWalkTwoToneIcon /> 10 min
                      <SubwayTwoToneIcon /> 10 min
                      <LocalTaxiTwoToneIcon /> 9 min */}
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
              /* <DirectionsWalkTwoToneIcon />
                10 min
                <SubwayTwoToneIcon /> 10 min
                <LocalTaxiTwoToneIcon /> 9 min */
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ItneraryList;

////////////////////////////////////////////////////
