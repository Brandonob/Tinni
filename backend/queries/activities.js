const db = require("../db/index");

// get all Activities
const getAllActivities = async (req, res, next) => {
  try {
    let activities = await db.any("SELECT * FROM activities");
    res.status(200).json({
      status: "success",
      message: "retrieved all activities",
      payload: activities,
    });
  } catch (err) {
    res.status(555).json({
      status: err,
      message: "Get all activities failed",
      payload: null,
    });

    next(err);
  }
};

// //get single activity based on id
const getActivity = async (req, res, next) => {
  try {
    let business = await db.one("SELECT * FROM activities WHERE id= $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      message: "retrieved single activity",
      payload: business,
    });
  } catch (err) {
    res.status(555).json({
      status: err,
      message: "activity not found",
      payload: null,
    });

    next(err);
  }
};
// add activity
const addActivity = async (req, res, next) => {
  try {
    // console.log(req.body);
    let activityAdded = await db.one(
      `INSERT INTO activities (itin_id , location, longitude, latitude, activity_name, image, activity_StartTime,activity_EndTime,duration,id) VALUES ('${req.body.itin_id}','${req.body.location}','${req.body.longitude}','${req.body.latitude}','${req.body.activity_name}','${req.body.image}','${req.body.StartTime}','${req.body.EndTime}','${req.body.duration}','${req.body.id}') RETURNING *`
    );
    res.status(200).json({
      status: "success",
      message: "added new activity",
      payload: activityAdded,
    });
  } catch (err) {
    res.status(555).json({
      status: err,
      message: "business not added",
      payload: null,
    });
    next(err);
  }
};

//Delete single activity
const deleteActivity = async (req, res, next) => {
  try {
    let deletedActivity = await db.any(
      `DELETE FROM activities WHERE id = ${req.params.id} RETURNING *`
    );
    res.status(200).json({
      status: "success",
      message: "activities Deleted",
      payload: deletedActivity,
    });
  } catch (error) {
    res.status(555).json({
      status: err,
      message: "activity could not be deleted",
      payload: null,
    });
    next(error);
  }
};

const getActivitybyitinerary = async (req, res, next) => {
  try {
    let activities = await db.any(
      "SELECT * FROM activities WHERE itin_id = $1 ORDER BY  activity_starttime",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      message: "retrieved all activities",
      payload: activities,
    });
  } catch (err) {
    res.status(555).json({
      status: err,
      message: "activity not found",
      payload: null,
    });

    next(err);
  }
};

module.exports = {
  getAllActivities,
  getActivity,
  addActivity,
  deleteActivity,
  getActivitybyitinerary,
};
