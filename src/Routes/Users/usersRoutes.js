const express = require("express");
const Users = require("../../Models/Users/Users");
const mongoose  = require("mongoose");
const { getAllUsersController, getOneUserController, postUserController } = require("../../Controller/UsersControllers/UsersControllers");


const getAllUserRoute = express.Router();
getAllUserRoute.get("/users", getAllUsersController);


const getOneUserRoute = express.Router();
getOneUserRoute.get("/users/:id", getOneUserController );


const postUserRoute = express.Router();
postUserRoute.post("/users", postUserController );


module.exports = { getAllUserRoute, getOneUserRoute, postUserRoute}