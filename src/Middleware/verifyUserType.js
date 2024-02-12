exports.verifyUserType = (req, res, next) => {
  const userType = req.params.userType;

  // Check if the requested user type is valid
  if (!["admin", "seller", "user"].includes(userType)) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  // Attach the user type to the request object
  req.userType = userType;
  next();
};
