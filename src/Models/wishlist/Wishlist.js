const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  owner_email: {
    type: String,
    required: true,
  },
  book_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  cover_image: {
    type: String,
  },
  writer: {
    type: String,
  },
  unit_price: {
    type: String,
  },
  total_price: {
    type: String,
  },
  isDeliverd:  Boolean,
  stock_limit: Number,
  quantity: Number
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;

