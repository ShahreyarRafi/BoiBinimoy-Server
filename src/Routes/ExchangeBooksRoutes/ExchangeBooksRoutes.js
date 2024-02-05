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

// Get all books
exchangeBooksRouter.get("/exchangableBooks", getAllBooks);

// Get a book by ID
exchangeBooksRouter.get("/exchangableBooks/:id", getBookById);

// Add a book
exchangeBooksRouter.post("/exchangableBooks", addBook);

// Update a book
exchangeBooksRouter.put("/exchangableBooks/:id", updateBook);

// Delete a book
exchangeBooksRouter.delete("/exchangableBooks/:id", deleteBook);

// Delete all books (use with caution)
exchangeBooksRouter.delete("/exchangableBooks", deleteAllBooks);

module.exports = exchangeBooksRouter;
