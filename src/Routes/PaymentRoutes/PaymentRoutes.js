const express = require("express");
const {
  postOrder,
  postSuccess,
} = require("../../Controller/PaymentControlers/PaymentControllers");
const Orders = require("../../Models/Orders/Orders");
const PaymentRouter = express.Router();

// order create route
PaymentRouter.post("/order", postOrder);

PaymentRouter.post("/success", postSuccess)




// success route

module.exports = PaymentRouter;
