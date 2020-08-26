/////////////////////////////////////////////////////////////////////

import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateItin } from "../CurrentItinerary/currentItinerarySlice";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import TimelineDot from "@material-ui/lab/TimelineDot";
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
  paddingLeft: "1px",
  // styles we need to apply on draggables
  ...draggableStyle,

  // ...(isDragging && {
  //   background: "rgb(235,235,235)",
  // }),

  background: isDragging ? "#E6F0EE" : "#172A3A",
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
                    <ListItemText
                    // primary={item.body.name}
                    // secondary={item.secondary}
                    />
                    <p>{item.body.time + "  "}</p> <p>{item.body.name}</p>
                    <IconButton onClick={deleteItin} id={index}>
                      <HighlightOffIcon />
                    </IconButton>
                    <ListItemSecondaryAction>
                      {/* <IconButton onClick={deleteItin} id={index}>
                        <HighlightOffIcon />
                      </IconButton> */}
                      {/* <p>direction</p> */}
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

////////////////////////////////////////////////////

// import React, { Component, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
// import Timeline from "@material-ui/lab/Timeline";
// import TimelineItem from "@material-ui/lab/TimelineItem";
// import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
// import TimelineConnector from "@material-ui/lab/TimelineConnector";
// import TimelineContent from "@material-ui/lab/TimelineContent";
// import FastfoodIcon from "@material-ui/icons/Fastfood";
// import TimelineDot from "@material-ui/lab/TimelineDot";
// import Paper from "@material-ui/core/Paper";
// import { Typography, ListItem } from "@material-ui/core/";
// import InboxIcon from "@material-ui/icons/Inbox";
// import EditIcon from "@material-ui/icons/Edit";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import {
//   reorder,
//   addItemToItin,
//   selectCurrentItin,
//   updateItin,
// } from "../CurrentItinerary/currentItinerarySlice";
// import "./ItineraryList.css";

// //style
// const getItemStyle = (isDragging, draggableStyle) => ({
//   // styles we need to apply on draggables
//   ...draggableStyle,

//   // ...(isDragging && {
//   //   background: "rgb(235,235,235)",
//   // }),
//   background: isDragging ? "lightgreen" : "grey",
// });

// const getListStyle = (isDraggingOver) => ({
//   // background: isDraggingOver ? "lightblue" : "lightgrey",
// });

// export default function BasicTimeline() {
//   const dispatch = useDispatch();
//   const currentItinerary = useSelector(selectCurrentItin);

//   // delete item from currentItinerary
//   const deleteItin = (e) => {
//     dispatch(updateItin(e.currentTarget.id));
//   };

//   const onDragEnd = (result) => {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }
//     let startIndex = result.source.index;
//     let endIndex = result.destination.index;
//     debugger;
//     dispatch(reorder({ startIndex, endIndex }));
//   };
//   return (
//     // <Timeline style={{ padding: "1px" }}>
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided, snapshot) => (
//           <div
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             {currentItinerary.map((item, index) => (
//               <Draggable
//                 key={item.body.id}
//                 draggableId={item.body.id}
//                 index={index}
//               >
//                 {(provided, snapshot) => (
//                   <ListItem
//                     ContainerComponent="li"
//                     ContainerProps={{ ref: provided.innerRef }}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={getItemStyle(
//                       snapshot.isDragging,
//                       provided.draggableProps.style
//                     )}
//                   >
//                     <TimelineItem
//                       id="item"
//                       style={{ padding: "1px" }}
//                       // ContainerComponent="li"
//                     >
//                       <TimelineSeparator style={{ padding: "1px" }}>
//                         <TimelineDot>
//                           <FastfoodIcon />
//                         </TimelineDot>
//                         <TimelineConnector />
//                       </TimelineSeparator>
//                       <TimelineContent style={{ padding: "1px" }}>
//                         <Paper style={{ padding: "1px" }}>
//                           <Typography variant="h6" component="h1">
//                             Eat
//                           </Typography>
//                           <Typography>Because you need strength</Typography>
//                           <IconButton
//                             onClick={deleteItin}
//                             id={index}
//                           ></IconButton>
//                         </Paper>
//                       </TimelineContent>
//                     </TimelineItem>
//                   </ListItem>
//                   /* <ListItem
//                          ContainerComponent="li"
//                          ContainerProps={{ ref: provided.innerRef }}
//                          {...provided.draggableProps}
//                          {...provided.dragHandleProps}
//                          style={getItemStyle(
//                            snapshot.isDragging,
//                            provided.draggableProps.style
//                          )}
//                        >

//                        <ListItemText
//                          primary={item.body.name}
//                         secondary={item.secondary}
//                        />
//                        <ListItemSecondaryAction>
//                          <IconButton onClick={deleteItin} id={index}>
//                            <HighlightOffIcon />
//                          </IconButton>
//                        </ListItemSecondaryAction>
//                      </ListItem> */
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>

// enddddddddd
// </Timeline>

//////////////
// <Timeline style={{ padding: "1px" }}>
//   {/* test */}
//   <TimelineItem id="item" style={{ padding: "1px" }}>
//     <TimelineSeparator style={{ padding: "1px" }}>
//       <TimelineDot>
//         <FastfoodIcon />
//       </TimelineDot>
//       <TimelineConnector />
//     </TimelineSeparator>
//     <TimelineContent style={{ padding: "1px" }}>
//       <Paper style={{ padding: "1px" }}>
//         <Typography variant="h6" component="h1">
//           Eat
//         </Typography>
//         <Typography>Because you need strength</Typography>
//       </Paper>
//     </TimelineContent>
//   </TimelineItem>
//   {/* 2 */}
//   <TimelineItem id="item" style={{ padding: "1px" }}>
//     <TimelineSeparator style={{ padding: "1px" }}>
//       <TimelineDot>
//         <FastfoodIcon />
//       </TimelineDot>
//       <TimelineConnector />
//     </TimelineSeparator>
//     <TimelineContent style={{ padding: "1px" }}>
//       <Paper style={{ padding: "1px" }}>
//         <Typography variant="h6" component="h1">
//           Eat
//         </Typography>
//         <Typography>Because you need strength</Typography>
//       </Paper>
//     </TimelineContent>
//   </TimelineItem>
// </Timeline>

///nooo
//   );
// }
