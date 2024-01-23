const { Schema, model} = require('mongoose');

const BuyBooksSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    writer : {
        type: String,
        required: true,
    },
    language : {
        type: String,
        required: true,
    },
    pages : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    published_year : {
        type: Number,
    },

});

const BuyBooks = model('BuyBooks', BuyBooksSchema);

module.exports = BuyBooks;
