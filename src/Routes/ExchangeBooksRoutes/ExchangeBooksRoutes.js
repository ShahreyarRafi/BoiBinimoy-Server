const express = require("express");
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  deleteAllBooks,
} = require("../../Controller/ExchangeBooksController/ExchangeBooksController");
const exchangeBooksRouter = express.Router();

// Get all exchangable books
exchangeBooksRouter.get("/exchange-books", getAllBooks);

// Get a exchangable book by id
exchangeBooksRouter.get("/exchange-books/:id", getBookById);

// Add a exchangable book
exchangeBooksRouter.post("/exchange-books", addBook);

// Update a exchangable book
exchangeBooksRouter.put("/exchange-books/:id", updateBook);

// Delete a exchangable book
exchangeBooksRouter.delete("/exchange-books/:id", deleteBook);

// Delete all exchangable books (use with caution)
exchangeBooksRouter.delete("/exchange-books", deleteAllBooks);

module.exports = exchangeBooksRouter;
