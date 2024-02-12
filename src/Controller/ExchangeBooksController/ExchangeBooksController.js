const ExchangeBooks = require("../../Models/ExchangeBooksModel/ExchangeBooksModel");

// controller for get all exchange books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await ExchangeBooks.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controller for get a exchange book  by id
exports.getBookById = async (req, res) => {
  try {
   
    const book = await ExchangeBooks.findById(req.params.id);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(book);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// controller for get individual exchange book  by id
exports.getIndividualExchangeBooks = async (req, res) => {
  try {
    const email = req.params.email;
    const query = {owner_email: email}
    const books = await ExchangeBooks.find(query);
    if (!books) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(books);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

// controller for add a exchange book
exports.addBook = async (req, res) => {
  const newBook = new ExchangeBooks(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// controller for update a exchange book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await ExchangeBooks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(updatedBook);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// controller for delete a exchange book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await ExchangeBooks.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ message: "Book deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controller for delete all exchange book
exports.deleteAllBooks = async (req, res) => {
  try {
    await ExchangeBooks.deleteMany();
    res.json({ message: "All books deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
