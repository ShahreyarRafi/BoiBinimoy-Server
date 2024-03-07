const express = require("express");
const { getSellerOrdersByEmail, updateDelivery } = require("../../Controller/SellerOrdersControllers/SellerOrdersControllers");
const SellerOrders = require("../../Models/SellerOrders/SellerOrders");
const SellerOrdersRouter = express.Router();


// get seller orders by email
SellerOrdersRouter.get("/seller-orders/:email", getSellerOrdersByEmail );

// get seller orders by email
SellerOrdersRouter.patch("/seller-orders/:book_id", updateDelivery );

module.exports = SellerOrdersRouter