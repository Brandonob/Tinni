const itineraries = require("express").Router()
const {getAllItin, getItinById, addItin, deleteItin, editItin} = require("../queries/itineraries.js")

itineraries.get("/", getAllItin)
itineraries.get("/:id", getItinById)
itineraries.post("/", addItin)

module.exports = itineraries