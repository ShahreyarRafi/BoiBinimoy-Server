const express = require("express");
const BuyBooks = require("../../Models/buyBooks/buyBooks");
const getAllBuyBooksRoute = express.Router();

getAllBuyBooksRoute.get("/api/v1/buyBook", async (req, res) => {
  try {
    const result = await BuyBooks.find();
    res.send(result);
  } catch (error) {
    console.error("Error getting buy books data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = getAllBuyBooksRoute;
