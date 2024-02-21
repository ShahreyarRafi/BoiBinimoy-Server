const { default: mongoose } = require("mongoose");

const ordersSchema = new mongoose.Schema({
    carts: [
      {
        user_name: {
            type: String,
            required: true
         },
         user_email: {
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
      }
    ],
    tranjectionId: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    isDeliverd: {
        type: Boolean,
        required: true
    },
    totalBooks: Number,
    totalPrice: {
        type: Number,
        required: true
    }
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;