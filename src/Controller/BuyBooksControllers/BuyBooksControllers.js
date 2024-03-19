const { mongoose } = require("mongoose");
const BuyBooks = require("../../Models/buyBooks/buyBooks");
const Users = require("../../Models/Users/Users");

// controller for get all buy books
exports.getAllBuyBookController = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 14;
  console.log("page:", page, "limit", limit);
  try {
    const totalBook = await BuyBooks.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    if (endIndex < totalBook) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    const aggregationPipline = [
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
    ];
    const buyBooks = await BuyBooks.aggregate(aggregationPipline);
    res.send({ totalBook, buyBooks });
  } catch (error) {
    console.log(error);
    console.error("Error getting buy books data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for get a buy book by id
exports.getOneBookController = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };
    const result = await BuyBooks.findOne(query);
    res.send(result);
  } catch (error) {
    console.error("Error getting one book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for get a buy book by id
exports.getIndividualBookController = async (req, res) => {
  try {
    const email = req.params.email;
    const query = { owner_email: email };
    const result = await BuyBooks.find(query);
    res.send(result);
  } catch (error) {
    console.error("Error getting one book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// controller for add a buy book
exports.postBuyBookController = async (req, res) => {
  try {
    const book = req.body;
    const newBook = new BuyBooks(book);
    const result = await newBook.save();
    res.send(result);
  } catch (error) {
    console.error("Error post book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for update a buy book
exports.updateBuyBook = async (req, res) => {
  try {
    const updateBuyBook = await BuyBooks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateBuyBook) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(updateBuyBook);
    }
  } catch (error) {
    console.error("Error update book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for delete a buy book
exports.deleteBuyBook = async (req, res) => {
  try {
    const deleteBook = await BuyBooks.findByIdAndDelete(req.params.id);
    if (!deleteBook) {
      res.status(404).json({ error: "Book not found" });
    }
    res.json(deleteBook);
  } catch (error) {
    console.error("Error delete book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========================================
// query query here
// =========================================
// query books by category
exports.getBooksByCategory = async (req, res) => {
  try {
    const category = new RegExp(req.params.category, "i");
    const books = await BuyBooks.find({ category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// query books by publisher
exports.getBooksByPublisher = async (req, res) => {
  try {
    const publisher = new RegExp(req.params.publisher, "i");
    const books = await BuyBooks.find({ publisher });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// query books by writer
exports.getBooksByWriter = async (req, res) => {
  try {
    const writer = new RegExp(req.params.writer, "i");
    const books = await BuyBooks.find({ writer });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// query books by language
exports.getBooksByLanguage = async (req, res) => {
  try {
    const language = new RegExp(req.params.language, "i");
    const books = await BuyBooks.find({ language });
    res.send(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get suggested books by user interest
exports.getSuggestedBooks = async (req, res) => {
  try {
    const userEmail = req.query.email;
    let books = []
    if(userEmail){
      const user = await Users.findOne({email: userEmail});
      const { category, writer, publisher, book } = user.interest;
  
      // Find books that match user interests
      books = await BuyBooks.find({
        $or: [
          { category: { $in: category } },
          { writer: { $in: writer } },
          { publisher: { $in: publisher } },
          { _id: { $in: book } },
        ],
      });
    }
    res.send(books)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// query book by title
exports.getBooksByName = async (req, res) => {
  try {
    const bookName = req.query?.bookName || "";
    console.log("book name", bookName);

    const books = await BuyBooks.find({
      title: { $regex: bookName, $options: "i" },
    });

    res.send(books);
  } catch (error) {
    console.error("Error querying books by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
