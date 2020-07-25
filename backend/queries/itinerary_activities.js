const db = require("../db/index")

const fetchItineraryActivites = async (req, res, next) => {
    try {
      let itins = await db.any(`SELECT * FROM activities JOIN itineraries ON activities.itin_id = itineraries.id WHERE itineraries.id = ${req.params.id}`)
  
      res.status(200).json({
        status: "Success",
        message: "All activities have been retrieved.",
        payload: itins
      })
    } catch (err) {
      res.status(404).json({
        status: "Error",
        message: "Unable to fetch itineraries",
        payload: null
      })
    }
  }




  
const addActivityToItinerary = async (req, res, next) => {
  try {
    let activityAdded = await db.one(
      `INSERT INTO activities (itin_id , location, longitude, latitude, activity_name, category,activity_time) VALUES ('${req.body.itin_id}','${req.body.location}','${req.body.longitude}','${req.body.latitude}','${req.body.activity_name}','${req.body.images}','${req.body.activity_time}') RETURNING *`
    );
    await db.one(
      
    )
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

  module.exports = {fetchItineraryActivites, addActivityToItinerary}

  