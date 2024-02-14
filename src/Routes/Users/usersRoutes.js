const express = require("express");
const {
  getAllUsersController,
  getOneUserController,
  postUserController,
  updateUser,
} = require("../../Controller/UsersControllers/UsersControllers");
const verifyAdmin = require("../../Middleware/VerifyAdmin/VerifyAdmin");
const verifyToken = require("../../Middleware/verifyToken");
const Users = require("../../Models/Users/Users");
const usersRoute = express.Router();

// get all users
usersRoute.get("/users",  getAllUsersController);



// get a user by id
usersRoute.get("/users/:email", getOneUserController);

// create a new user
usersRoute.post("/users", postUserController);


// update a user
usersRoute.patch("/users/:id", updateUser);

// get admin
usersRoute.get("/users/admin/:email")

module.exports = usersRoute;

// update