const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  publish_date: String,
  publish_time: String,
  title: {
    type: String,
    required: true,
  },
  tags: Array,
  category: {
    type: String,
    required: true,
  },
  body: {
    type: Array,
  },
  cover_image: String,
});

module.exports = mongoose.model("Blogs", BlogsSchema);
