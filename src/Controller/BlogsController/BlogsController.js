const Blogs = require("../../Models/Blogs/Blogs");

// get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const result = await Blogs.find();
    res.send(result);
  } catch (error) {
    console.error("Error getting blogs data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get a blog
exports.getOneBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blogs.findById(id);
    res.send(result);
  } catch (error) {
    console.error("Error getting a blog data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// create a blog
exports.createBlogController = async (req, res) => {
  try {
    const blog = req.body;
    const newBlog = new Blogs(blog);
    const result = await newBlog.save();
    res.send(result);
  } catch (error) {
    console.error("Error creating a blog :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update a blogs
exports.updateBlogController = async (req, res) => {
  try {
    const updateBlogData = await Blogs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateBlogData) {
      res.status(404).json({ error: "Blog not found" });
    } else {
      res.send(updateBlogData);
    }
  } catch (error) {
    console.error("Error update blog data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a blog
exports.deleteBlogController = async (req, res) => {
  try {
    const deleteBlog = await Blogs.findByIdAndDelete(req.params.id);
    if (!deleteBlog) {
      res.status(404).json({ error: "blog not found" });
    } else {
      res.send(deleteBlog);
    }
  } catch (error) {
    console.error("Error getting blogs data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
