const express = require("express");
const {
  getAllBuyBookController,
  getOneBookController,
  postBuyBookController,
  updateBuyBook,
  deleteBuyBook,
  getIndividualBookController
} = require("../../Controller/BuyBooksControllers/BuyBooksControllers");
const buyBookRouter = express.Router();

// get all buy-books
buyBookRouter.get("/buy-books", getAllBuyBookController);

// get a buy-books by id
buyBookRouter.get("/buy-books/:id", getOneBookController);

// get individual buy-books by email
buyBookRouter.get("/buy-books-individual/:email", getIndividualBookController);

// add a buy-books
buyBookRouter.post("/buy-books", postBuyBookController);

// update a buy-books
buyBookRouter.patch("/buy-books/:id", updateBuyBook);

// delete a buy-boks
buyBookRouter.delete("/buy-books/:id", deleteBuyBook);

module.exports = buyBookRouter;
