const express = require("express");
const {
  getAllBlogsController,
  getOneBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
} = require("../../Controller/BlogsController/BlogsController");

const blogsRouter = express.Router();

// get all blogs
blogsRouter.get("/blogs/", getAllBlogsController);

// get a blog by id
blogsRouter.get("/blogs/:id", getOneBlogController);

// create a blog
blogsRouter.post("/blogs", createBlogController);

// update a blog by id
blogsRouter.patch("/blogs/:id", updateBlogController);

// delete a blog by id
blogsRouter.delete("/blogs/:id", deleteBlogController);

module.exports = blogsRouter;
