const userItineraries = require("express").Router({ mergeParams: true });
const {fetchUserItineraries} = require("../../queries/User/itineraryquery")

userItineraries.get("/", fetchUserItineraries)


module.exports = userItineraries