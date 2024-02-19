const express = require("express");
const {
  postOrder,
  postSuccess,
} = require("../../Controller/PaymentControlers/PaymentControllers");
const PaymentRouter = express.Router();

// order create route
PaymentRouter.post("/order", postOrder);

// success route
PaymentRouter.post("/success/:tran_id", postSuccess);

module.exports = PaymentRouter;
