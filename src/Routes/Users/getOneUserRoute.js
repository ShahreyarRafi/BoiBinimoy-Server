const express = require("express");
const mongoose  = require("mongoose");
const Users = require("../../Models/Users/Users");
const getOneUserRoute = express.Router();

getOneUserRoute.get("api/v1/users/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const quary = { _id: new mongoose.Types.ObjectId(id)};
        const result = await Users.findOne(quary);
        res.send(result);
    } catch (error) {
        console.error("Error getting all users data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
});

module.exports = getOneUserRoute;