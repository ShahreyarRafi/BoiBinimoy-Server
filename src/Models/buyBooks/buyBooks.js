const { Schema, model } = require('mongoose');

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
        // required: true,
    },
    published_year: {
        type: Number,
        // required: true,
    },
    language: {
        type: String,
        // required: true,
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
    },
    edition: {
        type: String,
    },
    weight: {
        type: Number,
    },
    dimensions: {
        type: {
            height: Number,
            width: Number,
            depth: Number
        },
    },
    owner_email: {
        type: String,
        required: true
    },
    stock_limit: {
        type: Number,
    },
    availability: {
        type: Boolean,
    },
    upload_time: {
        type: Date,
        default: Date.now,  // Set default value to the current date and time
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
                user_rating: Number,
                user_email: String,
                comment: String,
            }
        ],
    },
    cover_image: {
        type: String,
        required: true
    },
    awards: {
        type: [String],
    },
    recommended_for: {
        type: [String],
    },
    format_details: {
        type: {
            is_ebook: Boolean,
            is_audio_book: Boolean,
            audio_book_narrator: String,
        },
    },
  
});

const BuyBooks = model('BuyBooks', BuyBooksSchema);

module.exports = BuyBooks;

