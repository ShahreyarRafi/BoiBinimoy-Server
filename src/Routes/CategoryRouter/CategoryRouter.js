const express = require("express");
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoryByName } = require("../../Controller/CategoryCotroller/CategoryController");
const categoryRouter = express.Router();
// const categoryController = require("../controllers/categoryController");

// Route to create a new category
categoryRouter.post("/category", createCategory);

// Route to get all categories
categoryRouter.get("/category", getAllCategories);

// Route to query a category by name
categoryRouter.get('/category/:name', getCategoryByName);

// Route to update a category
categoryRouter.put("/category/:id", updateCategory);

// Route to delete a category
categoryRouter.delete("/category/:id", deleteCategory);

module.exports = categoryRouter;
