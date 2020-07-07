const users = require("express").Router();
const {createUser, getAllUsers, loginUser, deleteUser, getSingleUser} = require ("../../queries/userQuery")

users.post("/", createUser); 
users.get("/all", getAllUsers )
users.post("/login", loginUser)
users.delete("/:id", deleteUser)
users.get("/singleUser/:id", getSingleUser)

module.exports = users 