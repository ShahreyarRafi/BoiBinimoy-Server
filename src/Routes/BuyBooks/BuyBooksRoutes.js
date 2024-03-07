const express = require("express");
const {
  getAllBuyBookController,
  getOneBookController,
  postBuyBookController,
  updateBuyBook,
  deleteBuyBook,
  getIndividualBookController,
  getBooksByCategory,
  getBooksByPublisher,

  getBooksByLanguage,
  getBooksByName,
  getBooksByWriter,
} = require("../../Controller/BuyBooksControllers/BuyBooksControllers");
const BuyBooks = require("../../Models/buyBooks/buyBooks");
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

// for query router by buy-books
// =====================================
// router to query books by category
buyBookRouter.get("/category/:category", getBooksByCategory);

// router to query books by publisher
buyBookRouter.get("/publisher/:publisher", getBooksByPublisher);

// router to query books by writer
buyBookRouter.get("/writer/:writer", getBooksByWriter);

// router to query books by language
buyBookRouter.get("/language/:language", getBooksByLanguage);


// router to query book by book name
buyBookRouter.get("/books/:bookName", getBooksByName);


buyBookRouter.get("/buyBooks", async(req, res) => {
    const result = await BuyBooks.find();
    res.send(result);
})


module.exports = buyBookRouter;
