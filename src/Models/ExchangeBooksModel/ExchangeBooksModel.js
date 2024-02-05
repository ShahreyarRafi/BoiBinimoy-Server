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
    cover_type: String,
    dimensions: Object,
    edition : String,
    format : String,
    rating : Number,
    tags : Array,
    is_bestseller : Boolean,
    cover_image : String,
    location : Object,
    originally_published_in : String,
    language_versions : Array,
    awards : Array,
    readers_reviews : Array,
    recommended_by : Array,
    release_date : String,
    digital_formats : Array,
    related_books : Array,
    bookstore_links : Object,
    owner_social_media_links:Object
});

module.exports = mongoose.model('ExchangeBook', ExchangeBooksSchema);


