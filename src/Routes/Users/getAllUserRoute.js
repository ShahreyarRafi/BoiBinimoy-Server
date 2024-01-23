const express = require("express");
const Users = require("../../Models/Users/Users");
const getAllUserRoute = express.Router();

getAllUserRoute.get("api/v1/users", async (req, res) => {
  try {
    const result = await Users.find();
    res.send(result);
  } catch (error) {
    console.error("Error getting all users data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = getAllUserRoute;
