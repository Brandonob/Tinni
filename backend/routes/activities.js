const activities = require("express").Router();

const {
  getAllActivities,
  getActivity,
  addActivity,
  deleteActivity,
  getActivitybyitinerary,
} = require("../queries/activities");

activities.get("/", getAllActivities); //  Get all activities
activities.get("/itin/:id", getActivitybyitinerary); //  Get all activities by itin
activities.get("/:id", getActivity); //Get single activity
activities.post("/", addActivity); //activities ?
// activities.patch("/:id", updateActivities); //Update single activities
activities.delete("/:id", deleteActivity); //Delete single biz
module.exports = activities;
