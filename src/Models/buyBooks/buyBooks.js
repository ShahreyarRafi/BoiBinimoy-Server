const { Schema, model } = require("mongoose");

const BuyBooksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  recommended_age: {
    type: String,
  },
  published_date: {
    type: Number,
  },
  language: {
    type: String,
  },
  pages: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  edition: {
    type: String,
  },
  weight: {
    type: Number,
  },
  dimensions: {
    type: {
      height: String,
      width: String,
      depth: String,
    },
  },
  owner_email: {
    type: String,
    required: true,
  },
  stock_limit: {
    type: Number,
  },
  upload_time: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
  },
  avg_rating: {
    type: Number,
  },
  reviews: {
    type: [
      {
        user_name: String,
        user_image: String,
        user_email: String,
        rating: Number,
        comment: String,
      },
    ],
  },
  cover_image: {
    type: String,
    required: true,
  },
  awards: {
    type: [String],
  },
  recommended_for: {
    type: [String],
  },
  format_details: {
    type: {
      ebook: String,
      audio_book: String,
      audio_book_narrator: String,
    },
  },
});

const BuyBooks = model("BuyBooks", BuyBooksSchema);

module.exports = BuyBooks;
