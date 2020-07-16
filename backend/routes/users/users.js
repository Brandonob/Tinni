const users = require("express").Router();
const userItinerariesRouter = require("./itineraries/userItineraries");
const {
  createUser,
  getAllUsers,
  deleteUser,
  getSingleUser,
} = require("../../queries/users/users");

users.use("/:id/itineraries", userItinerariesRouter);
users.post("/", createUser);
users.get("/", getAllUsers);
users.delete("/:id", deleteUser);
users.get("/:id", getSingleUser);

module.exports = users;
