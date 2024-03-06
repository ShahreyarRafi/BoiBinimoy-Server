const Users = require("../../Models/Users/Users");

const verifyAdmin = async (req, res, next) => {
  console.log("request decoded: ", req.user );
  const email = req.user?.email;
  const query = { email: email };
  const user = await Users.findOne(query);
  const isAdmin = user?.isAdmin === true;
  console.log(isAdmin);
  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = verifyAdmin;
