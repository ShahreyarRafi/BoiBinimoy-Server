const Orders = require("../../Models/Orders/Orders");

exports.getMyTotalOrders = async (req, res) => {
  try {
    const email = req.params.email;
    const totalOrders = await Orders.countDocuments({ clientEmail: email });
    res.send({ totalOrders });
  } catch (error) {
    console.error("Error getting total orders for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
