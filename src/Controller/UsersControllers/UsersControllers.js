const Users = require("../../Models/Users/Users");

// controller for get all user
exports.getAllUsersController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 14;
  try {
    const totalUser = await Users.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    if (endIndex < totalUser) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    const aggregationPipline = [
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
    ];
    const users = await Users.aggregate(aggregationPipline)

    res.send({totalUser, users });

  } catch (error) {
    console.error("Error getting all users data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for get a user by email
exports.getOneUserController = async (req, res) => {
  try {
    const requestedEmail = req.params.email;
    console.log("asdf", requestedEmail);
    const requestedUser = await Users.findOne({ email: requestedEmail });

    if (!requestedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(requestedUser);
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for  create new user
exports.postUserController = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
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

// controller for update user
exports.updateUser = async (req, res) => {
  try {
    const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateUser) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.json(updateUser);
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
