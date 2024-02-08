const Category = require("../../Models/Category/Category");

// Controller functions for CRUD operations

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, title } = req.body;
    const category = new Category({ name, title });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a category by category name
exports.getCategoryByName = async (req, res) => {
  try {
    const categoryName = req.params.name;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name, title } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, title },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
