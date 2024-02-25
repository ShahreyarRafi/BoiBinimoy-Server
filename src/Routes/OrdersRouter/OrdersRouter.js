const express = require("express");
const { getMyOrders, getSellerOrders } = require("../../Controller/OrdersControllers/OrdersControllers");

const OrdersRouter = express.Router();


// get my orders by email
OrdersRouter.get("/my-orders/:email", getMyOrders);

// get my orders by email
OrdersRouter.get("/seller-orders/:email", getSellerOrders);


module.exports = OrdersRouter;