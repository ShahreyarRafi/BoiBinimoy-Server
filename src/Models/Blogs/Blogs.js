const mongoose = require('mongoose');


const BlogsSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    publish_date: String,
    publish_time: String,
    title: String,
    body: String,
    cover_image: String
});

module.exports = mongoose.model('Blogs', BlogsSchema);


