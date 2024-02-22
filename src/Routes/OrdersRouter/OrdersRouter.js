const express = require("express");
const { getMyOrders } = require("../../Controller/OrdersControllers/OrdersControllers");

const OrdersRouter = express.Router();


// get my orders by email
OrdersRouter.get("/my-orders/:email", getMyOrders);


module.exports = OrdersRouter;