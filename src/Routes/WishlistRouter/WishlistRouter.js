const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../../Controller/WishlistController/WishlistController");
const wishlistRouter = express.Router();

// GET wishlist by user email
wishlistRouter.get("/wishlist/:userEmail", getWishlist);

// Add a book to the wishlist
wishlistRouter.post("/wishlist", addToWishlist);

// Remove a book from the wishlist
wishlistRouter.delete("/wishlist/remove/:wishlistId", removeFromWishlist);

module.exports = wishlistRouter;
