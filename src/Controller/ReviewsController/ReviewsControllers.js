const Reviews = require("../../Models/Reviews/Reviews");

exports.postReview = async(req, res) => {
    try{
      const review = req.body;
      const newReview = new Reviews(review);
      const result = await newReview.save();
      res.send(result);
    } catch (error) {
    console.error("Error post review data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getAllReviews = async(req, res) => {
    try{
      const result = await Reviews.find();
      res.send(result)
    }catch (error) {
    console.error("Error getting reviews data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getReviews = async(req, res) => {
    try{
       const book_id = req.params.id;
       const filter = { book_id: book_id}
       const result = await Reviews.find(filter);
       res.send(result);
    } catch (error) {
        console.error("Error delete review data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

exports.deleteReview = async(req, res) => {
    try{
       const id = req.params.id;
       const result = await Reviews.findByIdAndDelete(id);
       res.send(result);
    } catch (error) {
        console.error("Error delete review data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}