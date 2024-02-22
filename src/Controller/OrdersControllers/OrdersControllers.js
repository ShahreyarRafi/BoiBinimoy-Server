const Orders = require("../../Models/Orders/Orders");

exports.getMyOrders = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { clientEmail: email };
    const orders = await Orders.find(filter);
    const allCarts = [];
    orders.forEach((order) => {
      const cartsInOrder = order.carts;
      allCarts.push(...cartsInOrder);
    });

    res.send({ orders, allCarts});
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
