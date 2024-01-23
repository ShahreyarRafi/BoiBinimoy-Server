
const getAllUsersController = async (req, res) => {
    try {
      const result = await Users.find();
      res.send(result);
    } catch (error) {
      console.error("Error getting all users data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };



  const getOneUserController = async(req, res) => {
    try{
        const id = req.params.id;
        const quary = { _id: new mongoose.Types.ObjectId(id)};
        const result = await Users.findOne(quary);
        res.send(result);
    } catch (error) {
        console.error("Error getting all users data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}


const postUserController = async(req, res) =>{
    try{
        const user = req.body;
        const newUser  = new Users(user);
        const result = await newUser.save();
        res.send(result);
    } catch (error) {
        console.error('Error post user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

  module.exports = { getAllUsersController, getOneUserController, postUserController}


