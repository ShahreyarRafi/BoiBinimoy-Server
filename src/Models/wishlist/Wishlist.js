const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  userEmail: {
    type: String,
    require: true,
  },
  booksID: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
  },
  cover: {
    type: String,
  },
  writer: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
