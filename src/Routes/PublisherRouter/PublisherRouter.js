const express = require("express");
const {
  getAllPublisher,
  getPublisherById,
  addPublisher,
  deletePublisher,
  updatePublisher,
} = require("../../Controller/PublisherController/PublisherController");
const publisherRouter = express.Router();

// get all publisher router
publisherRouter.get("/publishers", getAllPublisher);

// get a publisher router
publisherRouter.get("/publishers/:id", getPublisherById);

// add a publisher router
publisherRouter.post("/publishers", addPublisher);

// update a publisher router
publisherRouter.patch("/publishers/:id", updatePublisher);

// delete a publisher router
publisherRouter.delete("/publishers/:id", deletePublisher);

module.exports = publisherRouter;
