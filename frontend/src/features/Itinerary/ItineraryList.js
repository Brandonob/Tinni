/////////////////////////////////////////////////////////////////////

import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateItin } from "../CurrentItinerary/currentItinerarySlice";

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";
import {
  reorder,
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  // ...(isDragging && {
  //   background: "rgb(235,235,235)",
  // }),
  background: isDragging ? "lightgreen" : "grey",
});

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
});

const ItneraryList = () => {
  const dispatch = useDispatch();
  const currentItinerary = useSelector(selectCurrentItin);

  // delete item from currentItinerary
  const deleteItin = (e) => {
    dispatch(updateItin(e.currentTarget.id));
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    let startIndex = result.source.index;
    let endIndex = result.destination.index;
    debugger;
    dispatch(reorder({ startIndex, endIndex }));
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {currentItinerary.map((item, index) => (
              <Draggable
                key={item.body.id}
                draggableId={item.body.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <ListItem
                    ContainerComponent="li"
                    ContainerProps={{ ref: provided.innerRef }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {/* <ListItemIcon>
                          {/* <p>Stop{index} </p> */}
                    {/* <InboxIcon /> */}
                    {/* </ListItemIcon>  */}

                    <ListItemText
                      primary={item.body.name}
                      // secondary={item.secondary}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={deleteItin} id={index}>
                        <HighlightOffIcon />
                      </IconButton>
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
