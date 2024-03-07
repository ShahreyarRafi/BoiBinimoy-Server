const mongoose = require('mongoose');


const ExchangeBooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    writer: String,
    description: String,
    publication_year: Number,
    edition : String,
    language: String,
    publisher: String,
    format: String,
    cover_type: String,
    dimensions: String,
    pages: Number,
    publisher: String,
    dimensions: Object,
    size: Number,
    time_frame: Number,
    rating : Number,
    cover_image : String,
    condition: String,
    exchange_status: String,
    owner: String,
    owner_email: String,
    phone_number: Number,
    location : Object,
});

module.exports = mongoose.model('ExchangeBooks', ExchangeBooksSchema);
