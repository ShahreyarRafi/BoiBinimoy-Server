const Carts = require("../../Models/Carts/Carts");
const BuyBooks = require("../../Models/buyBooks/buyBooks");

// get my all carts by email
exports.getMyCarts = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { user_email: email };
    const carts = await Carts.find(filter);

    // const bookPromises = carts.map(async (cart) => {
    //     const id = cart?.book_id || "";
    //     const book = await BuyBooks.findById(id) || {};
    //     return book;
    //   });
  
    //   const books = await Promise.all(bookPromises);
      
    //   const myCarts = carts.map( (cart, index) => {
    //     return {
    //       cart,
    //       book: books[index] || "book not found"
    //     };
    //   });

      let quantity = 0;
      let totalPrice = 0;
      carts?.map(cart =>{
        quantity += cart?.quantity;
        totalPrice += cart?.total_price;
      })
    
        res.send( {carts, quantity, totalPrice} );
      
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
    const query = { book_id: cart?.book_id };
    const existingBook = await Carts.findOne(query);
    if (existingBook) {
      return res.send({ message: "This book already exists", insertedId: null });
    }
    const newCart = new Carts(cart);
    const result = await newCart.save();
    res.send(result);
  } catch (error) {
    console.error("Error getting cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateCart = async (req, res) => {
  try{
    const id = req.params.id;
    const result = await Carts.findByIdAndUpdate(id, req.body, { new: true});
    res.send(result);
  }  catch (error) {
    console.error("Error update cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// delete a cart
exports.deleteACart = async (req, res) => {
    try{
       const result = await Carts.findByIdAndDelete(req.params.id);
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