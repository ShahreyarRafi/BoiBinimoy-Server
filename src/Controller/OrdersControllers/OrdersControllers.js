const Orders = require("../../Models/Orders/Orders");
const BuyBooks = require("../../Models/buyBooks/buyBooks");

// get my orders by email
exports.getMyOrders = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { clientEmail: email };
    const orders = await Orders.find(filter);
    const myOrders = [];
    
    orders.forEach((order) => {
      const cartsInOrder = order.carts;
      myOrders.push(...cartsInOrder);
    });
  
    // const bookPromises = allCarts.map(async (cart) => {
    //   const id = cart?.book_id || "";
    //   const book = await BuyBooks.findById(id) || {};
    //   return book;
    // });

    // const books = await Promise.all(bookPromises);
    
    // const myOrders = allCarts.map((cart, index) => {
    //   return {
    //     cart,
    //     book: books[index] || "book not found"
    //   }
    // }) 
    

    res.send({ orders, myOrders});
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// get seller orders by owner email;

exports.getSellerOrders = async (req, res) => {
  try{
    const ownerEmail = req.params.email;
    const orders = await Orders.find();
    const allCarts = [];
    
    orders.forEach((order) => {
      const cartsInOrder = order.carts;
      allCarts.push(...cartsInOrder);
    });
  
    const bookPromises = allCarts.map(async (cart) => {
      const id = cart?.book_id;
      const book = await BuyBooks.findById(id) || {};
      return book;
    });
       
    const books = await Promise.all(bookPromises);
    
    const sellerBooks = books.filter((book) => book.owner_email === ownerEmail)
   
    res.send(sellerBooks)
  }catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}