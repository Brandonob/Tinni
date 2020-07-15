const userItineraries = require("express").Router({ mergeParams: true });
const {getUserItins,getUserItinsByDate} = require("../../../queries/users/itineraries/userItineraries")

userItineraries.get("/", getUserItins)
userItineraries.get("/date", getUserItinsByDate)


module.exports = userItineraries