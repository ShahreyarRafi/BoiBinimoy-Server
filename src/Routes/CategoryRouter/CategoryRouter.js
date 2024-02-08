const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  getAllCategory,
} = require("../../Controller/CategoryCotroller/CategoryController");
const categoryRouter = express.Router();

// Route to create a new category
categoryRouter.post("/category", createCategory);

// Route to get all categories
categoryRouter.get("/category", getAllCategory);

// Route to query a category by name
categoryRouter.get("/category/:name", getCategoryByName);

// Route to update a category
categoryRouter.put("/category/:id", updateCategory);

// Route to delete a category
categoryRouter.delete("/category/:id", deleteCategory);

module.exports = categoryRouter;
