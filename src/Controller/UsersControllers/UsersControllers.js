const { default: mongoose } = require("mongoose");
const Users = require("../../Models/Users/Users");

// get all user
const getAllUsersController = async (req, res) => {
  try {
    const result = await Users.find();
    res.send(result);
  } catch (error) {
    console.error("Error getting all users data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get one user by id
const getOneUserController = async (req, res) => {
  try {
    const email = req.params.email;
    const quary = { email: email };
    const result = await Users.findOne(quary);
    res.send(result);
  } catch (error) {
    console.error("Error getting all users data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// create new user
const postUserController = async (req, res) => {
  try {
    const user = req.body;
    const query = { email: user.email };
    const existingUser = await Users.findOne(query);
    if (existingUser) {
      return res.send({ message: "user already exists", insertedId: null });
    }
    const newUser = new Users(user);
    const result = await newUser.save();
    res.send(result);
  } catch (error) {
    console.error("Error post user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateUser) {
        res.status(404).json({ error: 'user not found' });
    } else {
        res.json(updateUser);
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsersController,
  getOneUserController,
  postUserController,
  updateUser,
};
