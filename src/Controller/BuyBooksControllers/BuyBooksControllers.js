const getAllBuyBookController =  async (req, res) => {
    try {
      const result = await BuyBooks.find();
      res.send(result);
    } catch (error) {
      console.error("Error getting buy books data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

const getOneBookController = async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new mongoose.Types.ObjectId(id)}
      const result = await BuyBooks.findOne(query);
      res.send(result);
    } catch (error) {
      console.error("Error getting one book data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  const postBuyBookController = async(req, res) => {
    try{
        const book = req.body;
        const newBook  = new BuyBooks(book);
        const result = await newBook.save();
        res.send(result);
    }catch (error) {
        console.error('Error post book data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

  module.exports = { getAllBuyBookController, getOneBookController, postBuyBookController }