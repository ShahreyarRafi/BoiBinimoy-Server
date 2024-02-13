const express = require("express");
const {
  getAllWriter,
  getWriterById,
  addWriter,
  updateWriter,
  deleteWriter,
} = require("../../Controller/WriterController/WriterController");
const writerRouter = express.Router();

// get all writer router
writerRouter.get("/writers", getAllWriter);

// get a writer router
writerRouter.get("/writers/:id", getWriterById);

// add a writer router
writerRouter.post("/writers", addWriter);

// update a writer router
writerRouter.patch("/writers/:id", updateWriter);

// delete a writer  router
writerRouter.delete("/writers", deleteWriter);

module.exports = writerRouter;
