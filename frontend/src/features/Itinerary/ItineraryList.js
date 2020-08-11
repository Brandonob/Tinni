// import React, { Component, useState } from "react";
// import ReactDOM from "react-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { updateItin } from "../CurrentItinerary/currentItinerarySlice";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   ListItemSecondaryAction,
// } from "@material-ui/core";
// import RootRef from "@material-ui/core/RootRef";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import InboxIcon from "@material-ui/icons/Inbox";

// import {
//   addItemToItin,
//   selectCurrentItin,
// } from "../CurrentItinerary/currentItinerarySlice";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// // data generator
// // const getItems = (count) =>
// //   Array.from({ length: count }, (v, k) => k).map((k) => ({
// //     id: `item-${k}`,
// //     primary: `Stop ${k}`,
// //     secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
// //   }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // styles we need to apply on draggables
//   ...draggableStyle,

//   ...(isDragging && {
//     background: "rgb(235,235,235)",
//   }),
// });

// const getListStyle = (isDraggingOver) => ({
//   //background: isDraggingOver ? 'lightblue' : 'lightgrey',
// });

// const ItneraryList = () => {
//   // dispatch = useDispatch();
//   const currentItinerary = useSelector(selectCurrentItin);

//   // const [items, setItems] = useState([...currentItinerary]);
//   //   const onDragEnd = onDragEnd.bind();

//   const onDragEnd = async (result) => {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }
//     const items = reorder(
//       currentItinerary,
//       result.source.index,
//       result.destination.index
//     );
//     dispatch(updateItin(items));
//     // setItems(reorder(items, result.source.index, result.destination.index));

//     // await setItems(items);
//   };

//   const dispatch = useDispatch();
//   const deleteItin = (e) => {
//     debugger;
//     // let updatedItinerary = currentItinerary.splice(e.currentTarget.id,1)
//     dispatch(updateItin(currentItinerary, e.currentTarget.id));
//   };

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided, snapshot) => (
//           <RootRef rootRef={provided.innerRef}>
//             <List style={getListStyle(snapshot.isDraggingOver)}>
//               {currentItinerary.map((item, index) => (
//                 <Draggable
//                   key={item.body.id}
//                   draggableId={item.body.id}
//                   index={index}
//                 >
//                   {(provided, snapshot) => (
//                     <ListItem
//                       ContainerComponent="li"
//                       ContainerProps={{ ref: provided.innerRef }}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       <p> {index + 1}</p>
//                       <ListItemText
//                         style={{ margin: "5px" }}
//                         primary={item.body.name}
//                         // secondary={item.secondary}
//                       />

//                       <ListItemSecondaryAction>
//                         <IconButton onClick={deleteItin} id={index}>
//                           <HighlightOffIcon />
//                         </IconButton>
//                       </ListItemSecondaryAction>
//                     </ListItem>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </List>
//           </RootRef>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// // Put the thing into the DOM!
// export default ItneraryList;

/////////////////////////////////////////////////////////////////////

import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
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

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    primary: `item ${k}`,
    secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
  }));

// a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

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

const ItneraryList = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  const [items, setItems] = useState(getItems(10));
  //   };
  //   this.onDragEnd = this.onDragEnd.bind(this);
  // }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    let newitems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    // this.setState({
    setItems(newitems);
    // items,
    // });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        <ListItemIcon>
                          <p>Stop{index} </p>
                          <InboxIcon />
                        </ListItemIcon>

                        <ListItemText
                          primary={item.primary}
                          secondary={item.secondary}
                        />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <EditIcon />
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
    </>
  );
};
export default ItneraryList;

// Put the thing into the DOM!
// ReactDOM.render(<App />, document.getElementById("root"));
