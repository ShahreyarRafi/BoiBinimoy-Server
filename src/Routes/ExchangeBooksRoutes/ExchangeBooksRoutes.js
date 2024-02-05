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
exchangeBooksRouter.get("/exchangableBooks", getAllBooks);

// Get a exchangable book by id
exchangeBooksRouter.get("/exchangableBooks/:id", getBookById);

// Add a exchangable book
exchangeBooksRouter.post("/exchangableBooks", addBook);

// Update a exchangable book
exchangeBooksRouter.put("/exchangableBooks/:id", updateBook);

// Delete a exchangable book
exchangeBooksRouter.delete("/exchangableBooks/:id", deleteBook);

// Delete all exchangable books (use with caution)
exchangeBooksRouter.delete("/exchangableBooks", deleteAllBooks);

module.exports = exchangeBooksRouter;
