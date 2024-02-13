const { mongoose } = require("mongoose");
const BuyBooks = require("../../Models/buyBooks/buyBooks");

// controller for get all buy books
exports.getAllBuyBookController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 14;
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
    res.send({totalBook,  buyBooks });
  } catch (error) {
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
