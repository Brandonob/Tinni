import { createSlice } from "@reduxjs/toolkit";
export const currentItinerarySlice = createSlice({
  name: "currentItinerary",
  initialState: [],
  reducers: {
    addItemToItin: {
      reducer: (state, action) => {
        state.push(action.payload);
        return handleTime(state);
        // let timeintin = "19:00";
        // state.forEach((el, i) => {
        //   if (i === 0) {
        //     let target = new Date("2020-02-20 " + timeintin);
        //     state[i].body.time.startTime = timeintin;
        //     target.setMinutes(target.getMinutes() + [el][0].body.time.duration);
        //     state[i].body.time.endTime =
        //       target.getHours() + ":" + target.getMinutes();
        //   } else {
        //     let target = new Date(
        //       "2020-02-20 " + state[i - 1].body.time.endTime
        //     );
        //     state[i].body.time.startTime = state[i - 1].body.time.endTime;
        //     target.setMinutes(target.getMinutes() + [el][0].body.time.duration);
        //     state[i].body.time.endTime =
        //       target.getHours() + ":" + target.getMinutes();
        //   }
        // });
        // return state;
      },
      prepare: (body) => {
        return { payload: { body } };
      },
    },
    updateItin: (state, action) => {
      state.splice(action.payload, 1);
      return handleTime(state);
    },
    reorder: (state, action) => {
      //   const result = Array.from(state);
      const [removed] = state.splice(action.payload.startIndex, 1);
      state.splice(action.payload.endIndex, 0, removed);
      return handleTime(state);
      // let target = new Date("2020-02-20 " + "19:00");
      // state.forEach((el, i) => {
      //   debugger;
      //   target.setMinutes(target.getMinutes() + [el][0].body.time.duration);

      //   state[i][0].time.endTime =
      //     target.getHours() + ":" + target.getMinutes();
      // });
      // // [i][0].body.time.endTime = target.getHours() + ":" + target.getMinutes();

      // return state;
    },
    updateTime: (state, action) => {
      debugger;
      state[action.payload.index].body.time.endTime = action.payload.timeEnd;
      return state;
    },
  },
});

const handleTime = (state) => {
  let timeintin = "13:00";
  state.forEach((el, i) => {
    if (i === 0) {
      let target = new Date("2020-02-20 " + timeintin);
      state[i].body.time.startTime = timeintin;
      target.setMinutes(target.getMinutes() + [el][0].body.time.duration);
      state[i].body.time.endTime =
        target.getHours() + ":" + target.getMinutes();
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

export const selectCurrentItin = (state) => state.currentItinerary;
export const {
  addItemToItin,
  updateItin,
  reorder,
  updateTime,
} = currentItinerarySlice.actions;
export default currentItinerarySlice.reducer;
