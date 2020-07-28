import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
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

import {
  addItemToItin,
  selectCurrentItin,
} from "../CurrentItinerary/currentItinerarySlice";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// data generator
// const getItems = (count) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k}`,
//     primary: `Stop ${k}`,
//     secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
//   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)",
  }),
});

const getListStyle = (isDraggingOver) => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const ItneraryList = ({ currentItinerary }) => {
  // dispatch = useDispatch();
  // const currentItinerary = useSelector(selectCurrentItin);

  // const [items, setItems] = useState([...currentItinerary]);
  //   const onDragEnd = onDragEnd.bind();

  const onDragEnd = async (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // setItems(reorder(items, result.source.index, result.destination.index));

    // await setItems(items);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  debugger;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List style={getListStyle(snapshot.isDraggingOver)}>
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
                      <p> {index++}</p>
                      <ListItemText
                        style={{ margin: "5px" }}
                        primary={item.body.name}
                        // secondary={item.secondary}
                      />

                      <ListItemSecondaryAction>
                        <IconButton>
                          <HighlightOffIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Put the thing into the DOM!
export default ItneraryList;
