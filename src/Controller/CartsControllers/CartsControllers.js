const Carts = require("../../Models/Carts/Carts");

// get my all carts
exports.getMyCarts = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { user_email: email };
    const carts = await Carts.find(filter);
    res.send(carts);
  } catch (error) {
    console.error("Error getting my carts data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get one carts
exports.getOneCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Carts.findById(id);
    res.send(cart);
  } catch (error) {
    console.error("Error getting cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add to cart
exports.addToCart = async (req, res) => {
  try {
    const cart = req.body;
    const newCart = new Carts(cart);
    const result = await newCart.save();
    res.send(result);

  } catch (error) {
    console.error("Error getting cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// delete a cart
exports.deleteACart = async (req, res) => {
    try{
       const id = req.params.id;
       const result = await Carts.findByIdAndDelete(id);
       res.send(result);
    }  catch (error) {
        console.error("Error delete cart data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};


// delete my all carts
exports.deleteMyCarts = async (req, res) => {
    try{
       const email = req.params.email;
       const result = await Carts.deleteMany({user_email: email});
       res.send(result);
    } catch (error) {
        console.error("Error delete my all carts data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}