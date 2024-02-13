const express = require("express");
const { getReviews, postReview } = require("../../Controller/reviewsController/ReviewsControllers");
const reviewsRouter = express.Router();


reviewsRouter.get("/reviews", );

// get reviews
reviewsRouter.get("/reviews/:id", getReviews);

// post a review 
reviewsRouter.post("/reviews", postReview );

// delete a review 
reviewsRouter.delete("/reviews/:id", postReview );


module.exports = reviewsRouter;