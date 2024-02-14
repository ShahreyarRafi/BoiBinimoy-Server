const express = require("express");
const { getAllReviews, getReviews, postReview, deleteReview } = require("../../Controller/ReviewsController/ReviewsControllers2");
const reviewsRouter = express.Router();
// const {
// //   getReviews,
// //   postReview,
//   getAllReviews,
// //   deleteReview,
// } = require("../../Controller/reviewsController/ReviewsControllers");

// get all reviews
reviewsRouter.get("/reviews", getAllReviews);

// // get reviews
reviewsRouter.get("/reviews/:id", getReviews);

// // post a review
reviewsRouter.post("/reviews", postReview);

// // delete a review
reviewsRouter.delete("/reviews/:id", deleteReview);

module.exports = reviewsRouter;
