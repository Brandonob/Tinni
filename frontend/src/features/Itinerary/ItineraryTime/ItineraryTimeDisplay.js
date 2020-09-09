import React, { useEffect, useState } from "react";

const TimeDisplay = ({ min, time, setEndTime, endTime }) => {
  // target.setHours(Number(time[0] + time[1]), Number(time[2] + time[3]));

  useEffect(() => {
    let target = new Date("2020-02-20 " + time);
    target.setMinutes(target.getMinutes() + min);
    setEndTime(target.getHours() + ":" + target.getMinutes());
  }, []);

  return <p>{time + " - " + endTime}</p>;
  // console.log("time is " + target.getHours() + ":" + target.getMinutes());
};
export default TimeDisplay;
