const { default: mongoose } = require("mongoose");

const sellerOrdersSchema = new mongoose.Schema({
  carts: [
    {
      user_name: {
        type: String,
        required: true,
      },
      user_email: {
        type: String,
        required: true,
      },
      owner_email: {
        type: String,
        required: true,
      },
      book_id: {
        type: String,
        required: true,
      },
      unit_price: {
        type: Number,
        required: true,
      },
      total_price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      isDeliverd: {
        type: Boolean,
      },
      cover_image: {
        type: String,
      },
      stock_limit: Number,
      title: String,
    },
  ],
  tranjectionId: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  isDeliverd: {
    type: Boolean,
    required: true,
  },
  totalBooks: Number,
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: new Date(),
  },
  clientEmail: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
});

const SellerOrders = mongoose.model("SellerOrders", sellerOrdersSchema);

module.exports = SellerOrders;
