const { Schema, model} = require('mongoose');

const BannerDataSchema = new Schema({
    cover_image : {
        type: String,
        // required: true,
    },
    author : {
        type: String,
    
    },
    title : {
        type: String,
        required: true,
    },
    topic : {
        type: String,
    },
    description : {
        type: String,
    },
    see_more_button: String,
    buy_now_button: String,
    thumbnail_img : {
        type: String,
    },
    thumbnail_title : {
        type: String,
    },
    thumbnail_description : {
        type: String,
    }
});

const BannerData = model('BannerData', BannerDataSchema);
module.exports = BannerData;

