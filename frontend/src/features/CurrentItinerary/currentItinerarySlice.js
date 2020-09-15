import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
// import { selectCurrentItinInfo } from "../Itinerary/CurrentItinInfoSlice";
// const currentItineraryInfo = useSelector(selectCurrentItinInfo);
export const currentItinerarySlice = createSlice({
  name: "currentItinerary",
  initialState: {
    id: null,
    Title: "My Itinerary",
    Date: "",
    Time: "12:00 ",
    list: [],
  },
  reducers: {
    addItemToItin: {
      reducer: (state, action) => {
        state.list.push(action.payload);
        handleTime(state.list, state.Time);
        return state;
      },
      prepare: (body) => {
        return { payload: { body } };
      },
    },
    updateItin: (state, action) => {
      state.list.splice(action.payload, 1);
      handleTime(state.list, state.Time);
      return state;
    },
    reorder: (state, action) => {
      const [removed] = state.list.splice(action.payload.startIndex, 1);
      state.list.splice(action.payload.endIndex, 0, removed);
      handleTime(state.list, state.Time);
      return state;
    },
    updateTime: (state, action) => {
      state.list[action.payload.index].body.time.endTime =
        action.payload.timeEnd;
      return state;
    },
    setID: (state, action) => {
      state.list[action.payload.index].body.id = action.payload.id;
      return state;
    },
    updateTitle: (state, action) => {
      state.Title = action.payload;
      return state;
    },
    updateDate: (state, action) => {
      state.Date = action.payload;
      return state;
    },
    updateItinTime: (state, action) => {
      state.Time = action.payload;
      handleTime(state.list, state.Time);
      return state;
    },
    updateID: (state, action) => {
      state.id = action.payload;
      return state;
    },
    clearItin: (state, action) => {
      return {
        id: null,
        Title: "My Itinerary",
        Date: "",
        Time: "12:00 ",
        list: [],
      };
    },
  },
});

export const selectCurrentItin = (state) => state.currentItinerary.list;
export const selectCurrentItinAll = (state) => state.currentItinerary;
export const {
  addItemToItin,
  updateItin,
  reorder,
  updateTime,
  updateItinTime,
  updateID,
  updateTitle,
  updateDate,
  clearItin,
  setID,
} = currentItinerarySlice.actions;
export default currentItinerarySlice.reducer;

const handleTime = (state, time) => {
  let timeintin = time;

  state.forEach((el, i) => {
    if (i === 0) {
      let target = new Date("2020-02-20 " + timeintin);
      state[i].body.time.startTime = timeintin;
      target.setMinutes(target.getMinutes() + [el][0].body.time.duration);
      state[i].body.time.endTime =
        target.getHours() + ":" + target.getMinutes();
      debugger;
    } else {
      let target = new Date("2020-02-20 " + state[i - 1].body.time.endTime);

      state[i].body.time.startTime = state[i - 1].body.time.endTime;

      target.setMinutes(target.getMinutes() + [el][0].body.time.duration);

      if (target.getMinutes() === 0) {
        state[i].body.time.endTime = target.getHours() + ":" + "00";
      } else {
        state[i].body.time.endTime =
          target.getHours() + ":" + target.getMinutes();
      }
    }
  });
  return state;
};
