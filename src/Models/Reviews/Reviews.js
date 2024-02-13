const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
    book_id: {
        type: String,
        required: true
    },
    user_name: String,
    user_image: String,
    user_email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
});


const Reviews = mongoose.model("Reviews", ReviewsSchema);
module.exports = Reviews;
