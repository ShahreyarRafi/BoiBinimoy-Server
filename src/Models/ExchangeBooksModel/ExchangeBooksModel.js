const mongoose = require('mongoose');

const ExchangeBooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    writer: String,
    publication_year: Number,
    condition: String,
    owner: String,
    exchange_status: String,
    language: String,
    pages: Number,
    publisher: String,
    cover_type: String
});

module.exports = mongoose.model('ExchangeBook', ExchangeBooksSchema);
