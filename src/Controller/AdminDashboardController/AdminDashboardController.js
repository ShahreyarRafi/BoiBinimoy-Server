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

// get total sales controller
exports.getTotalSales = async (req, res) => {
  try {
    const orders = await Orders.find();
    let totalSales = 0;

    orders.forEach((order) => {
      totalSales += order.totalPrice;
    });

    res.send({ totalSales });
  } catch (error) {
    console.error("Error getting total sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get low stock limit books
exports.getLowStockBooks = async (req, res) => {
  try {
    const lowStockBooks = await BuyBooks.find({ stock_limit: { $lte: 5 } });
    res.send({ lowStockBooks });
  } catch (error) {
    console.error("Error getting low stock books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
