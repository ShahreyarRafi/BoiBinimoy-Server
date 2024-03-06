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

// get recent order with books
exports.getRecentOrderedBooks = async (req, res) => {
  try {
    // find 10 most recent orders
    const recentOrders = await Orders.find().sort({ orderDate: -1 }).limit(10);

    // populated  book details for each order
    const populatedOrders = await Promise.all(
      recentOrders.map(async (order) => {
        const populatedCarts = await Promise.all(
          order.carts.map(async (cart) => {
            const book = await BuyBooks.findById(cart.book_id);
            return { ...cart.toObject(), book };
          })
        );
        return { ...order.toObject(), carts: populatedCarts };
      })
    );

    res.send({ recentOrders: populatedOrders });
  } catch (error) {
    console.error("Error getting recent orders with books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 10 top selling books router
exports.getTopSellingBooks = async (req, res) => {
  try {
    const topSellingBooks = await Orders.aggregate([
      { $unwind: "$carts" },
      {
        $group: {
          _id: "$carts.book_id",
          totalQuantity: { $sum: "$carts.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ]);

    res.send({ topSellingBooks });
  } catch (error) {
    console.error("Error getting top selling books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 10 top buying customer controller
exports.getTopBuyingCustomers = async (req, res) => {
  try {
    const topBuyingCustomers = await Orders.aggregate([
      {
        $group: {
          _id: "$clientEmail",
          totalPurchaseAmount: { $sum: "$totalPrice" },
        },
      },
      { $sort: { totalPurchaseAmount: -1 } },
      { $limit: 10 },
    ]);

    res.send({ topBuyingCustomers });
  } catch (error) {
    console.error("Error getting top buying customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


