const express = require("express");
const { getSellerOrdersByEmail, updateDelivery } = require("../../Controller/SellerOrdersControllers/SellerOrdersControllers");
const SellerOrdersRouter = express.Router();


// get seller orders by email
SellerOrdersRouter.get("/seller-orders/:email", getSellerOrdersByEmail );

// get seller orders by email
SellerOrdersRouter.patch("/seller-orders/:id", updateDelivery );


module.exports = SellerOrdersRouter