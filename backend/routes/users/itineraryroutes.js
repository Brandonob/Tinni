const userItineraries = require("express").Router({ mergeParams: true });
const {fetchUserItineraries} = require("../../queries/users/itineraries/userItineraries")

userItineraries.get("/", fetchUserItineraries)


module.exports = userItineraries