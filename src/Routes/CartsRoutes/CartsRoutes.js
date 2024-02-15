const express = require("express");
const { getMyCarts, getOneCart, addToCart, deleteACart, deleteMyCarts } = require("../../Controller/CartsControllers/CartsControllers");

const CartsRouter = express.Router();


// get my carts by email
CartsRouter.get("/my-carts/:email", getMyCarts);

// get one cart by cart _id
CartsRouter.get("/carts/:id", getOneCart);

// add a cart 
CartsRouter.post("/carts", addToCart);

// delete a cart
CartsRouter.delete("/delete-cart/:id", deleteACart);

// delete my all carts
CartsRouter.delete("/delete-my-carts/:email", deleteMyCarts);


module.exports = CartsRouter;