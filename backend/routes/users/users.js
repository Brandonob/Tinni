const users = require("express").Router();
const userItineraries = require("./itineraryroutes");
const {
  createUser,
  getAllUsers,
  deleteUser,
  getSingleUser,
} = require("../../queries/User/userQuery");

users.use("/:id/itineraries", userItineraries);
users.post("/", createUser);
users.get("/all", getAllUsers);
users.delete("/:id", deleteUser);
users.get("/singleUser/:id", getSingleUser);

module.exports = users;
