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
    owner_email: String,
    exchange_status: String,
    language: String,
    pages: Number,
    publisher: String,
    cover_type: Array,
    dimensions: Object,
    time_frame: Number,
    edition : String,
    formats : Array,
    rating : Number,
    tags : Array,
    cover_image : String,
    location : Object,
    originally_published_in : String,
    release_date : String,
    owner_social_media_links:Object
});

module.exports = mongoose.model('ExchangeBook', ExchangeBooksSchema);

