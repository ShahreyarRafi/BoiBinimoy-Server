const express = require("express");
const mongoose = require('mongoose');
const BuyBooks = require("../../Models/buyBooks/buyBooks");
const getOneBookRoute = express.Router();

getOneBookRoute.get("/api/v1/buyBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id)}
    const result = await BuyBooks.findOne(query);
    res.send(result);
  } catch (error) {
    console.error("Error getting one book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = getOneBookRoute;