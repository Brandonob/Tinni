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
let addednum = 0;
const getItemStyle = (isDragging, draggableStyle) => ({
  paddingLeft: "1px",
  // styles we need to apply on draggables
  ...draggableStyle,

  // ...(isDragging && {
  //   background: "rgb(235,235,235)",
  // }),

  background: isDragging ? "#E6F0EE" : "#172A3A",
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

  debugger;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {currentItinerary.map((item, index) => (
              <>
                <Draggable
                  key={item.body.id}
                  draggableId={item.body.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ListItem
                      id="listItinItem"
                      // ContainerComponent="li"
                      ContainerProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <TimelineDot>
                        <FastfoodIcon />
                      </TimelineDot>
                      <ListItemText />

                      {/* {stopTime((addedMin += item.body.time), time)} */}
                      {/* <TimeDisplay
                        min={(addednum += item.body.time.duration)}
                        time={time}
                        endTime={endTime}
                        setEndTime={setEndTime}
                      /> */}
                      <p>{item.body.time.duration}</p>

                      <p> {item.body.name}</p>
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
                <DirectionsWalkTwoToneIcon />
                10 min
                <SubwayTwoToneIcon /> 10 min
                <LocalTaxiTwoToneIcon /> 9 min
              </>
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
