const express = require("express");
const { getAllUsersController, getOneUserController, postUserController, updateUser } = require("../../Controller/UsersControllers/UsersControllers");

// get all users
const getAllUserRoute = express.Router();
getAllUserRoute.get("/users", getAllUsersController);

// get one user
const getOneUserRoute = express.Router();
getOneUserRoute.get("/users/:email", getOneUserController );

// create a new user
const postUserRoute = express.Router();
postUserRoute.post("/users", postUserController );

// update a user
const updateUserRoute = express.Router();
updateUserRoute.patch("/users/:id", updateUser );


module.exports = { getAllUserRoute, getOneUserRoute, postUserRoute, updateUserRoute}