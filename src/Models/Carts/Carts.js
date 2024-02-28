const { default: mongoose } = require("mongoose");


const CartsSchema = new mongoose.Schema({
    user_name: {
       type: String,
       required: true
    },
    user_email: {
        type: String,
        required: true
    },
    owner_email: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


const Carts = mongoose.model("Carts", CartsSchema);

module.exports = Carts;
