const mongoose = require('mongoose');

const RequestBooksSchema = new mongoose.Schema({
    owner_name: {
        type: String,
    },
    owner_email:{
        type: String, 
        required: true
    } ,
    requester_name: String,
    requester_email: {
        type: String,
        required: true
    },
    owner_book_id: {
        type: String,
        required: true
    },
    requester_book_id: {
        type: String,
        required: true
    },
    req_date: String,
    req_time: String,
    req_message: String,
    status: String
});

module.exports = mongoose.model('RequestBooks', RequestBooksSchema);




