const express = require("express");
const {
  getAllBuyBookController,
  getOneBookController,
  postBuyBookController,
  updateBuyBook,
  deleteBuyBook,
} = require("../../Controller/BuyBooksControllers/BuyBooksControllers");
const buyBookRouter = express.Router();

buyBookRouter.get("/buyBooks", getAllBuyBookController);

buyBookRouter.get("/buyBooks/:id", getOneBookController);

buyBookRouter.post("/buyBooks", postBuyBookController);

buyBookRouter.patch("/buyBooks/:id", updateBuyBook);

buyBookRouter.delete("/buyBooks/:id", deleteBuyBook);

module.exports = buyBookRouter;
