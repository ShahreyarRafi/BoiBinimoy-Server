const Orders = require("../../Models/Orders/Orders");
const BuyBooks = require("../../Models/buyBooks/buyBooks");

// get total orders
exports.getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Orders.countDocuments();
    res.send({ totalOrders });
  } catch (error) {
    console.error("Error getting total orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total sales
exports.getTotalSales = async (req, res) => {
  try {
    const orders = await Orders.find();
    let totalSales = 0;

    for (const order of orders) {
      for (const cart of order.carts) {
        const book = await BuyBooks.findById(cart.book_id);
        if (book) {
          totalSales += book.price * cart.quantity;
        } else {
          console.error(`Book not found for cart with ID: ${cart.book_id}`);
        }
      }
    }

    res.send({ totalSales });
  } catch (error) {
    console.error("Error getting total sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
