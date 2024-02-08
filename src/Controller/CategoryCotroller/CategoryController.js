const Category = require("../../Models/Category/Category");

// Controller for creating a new category
exports.createCategory = async (req, res) => {
  try {
    const { category_name, category_image } = req.body;
    const newCategory = await Category.create({
      category_name,
      category_image,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting all categories
exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryByName = async (req, res) => {
  try {
    const categoryName = req.params.name.toLowerCase();
    const category = await Category.findOne({ category_name: { $regex: new RegExp('^' + categoryName + '$', 'i') } });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller for updating a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { category_name, category_image } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { category_name, category_image },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
