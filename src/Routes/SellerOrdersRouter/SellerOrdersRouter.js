const express = require("express");
const { getSellerOrdersByEmail } = require("../../Controller/SellerOrdersControllers/SellerOrdersControllers");
const SellerOrdersRouter = express.Router();


// get seller orders by email
SellerOrdersRouter.get("/seller-orders/:email", getSellerOrdersByEmail );


module.exports = SellerOrdersRouter