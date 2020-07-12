const itineraryActivity = require("express").Router({mergeParams : true })

const {fetchItineraryActivites, addActivityToItinerary} = require("../queries/itinerary_activities")

itineraryActivity.get("/:id", fetchItineraryActivites)
itineraryActivity.post("/", addActivityToItinerary)

module.exports = itineraryActivity



