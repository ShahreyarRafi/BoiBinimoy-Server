const RequestBooks = require("../../Models/RequestBooks/RequestBooks");

// get all request books
exports.getAllRequestBooksController = async (req, res) => {
  try {
    const requestBooks = await RequestBooks.find();
    res.send(requestBooks);
  } catch (error) {
    console.error("Error getting all request books data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get one request books
exports.getOneRequestBooksController = async (req, res) => {
  try {
     const requestBook = await RequestBooks.findById(req.params.id);
     res.send(requestBook);
  } catch (error) {
    console.error("Error getting a request books data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// post a post request book
exports.postRequestBooksController = async (req, res) => {
  try {
    const requestBook = req.body;
    const newRequestBook = new RequestBooks(requestBook)
    const result = await newRequestBook.save();
    res.send(result);
  } catch (error) {
    console.error("Error post request book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// update a request book
exports.updateRequestBooksController = async (req, res) => {
  try {
    const updateReqBook = await RequestBooks.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.send(updateReqBook);
  } catch (error) {
    console.error("Error update request book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// delete a request book
exports.deleteRequestBooksController = async (req, res) => {
  try {
    const deleteBook = await RequestBooks.findByIdAndDelete(req.params.id);
    res.send(deleteBook);
  } catch (error) {
    console.error("Error delete request book data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
