const itineraries = require("express").Router()
const itineraryActivity = require("../routes/itinerary_activities")
const {getAllItin, getItinById, addItin, deleteItin, editItin} = require("../queries/itineraries.js")

itineraries.use("/itineraryactivity", itineraryActivity)

itineraries.get("/", getAllItin)
itineraries.get("/:id", getItinById)
itineraries.post("/", addItin)
itineraries.delete("/:id", deleteItin)
itineraries.patch("/:id", editItin)

module.exports = itineraries