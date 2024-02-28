const SellerOrders = require("../../Models/SellerOrders/SellerOrders");
const BuyBooks = require("../../Models/buyBooks/buyBooks");


exports.getSellerOrdersByEmail = async(req, res) => {
    try{
        const email = req.params.email;
        const query = {ownerEmail: email };
        const orders = await SellerOrders.find(query);
        const allCarts = [];
    
        orders.forEach((order) => {
          const cartsInOrder = order.carts;
          allCarts.push(...cartsInOrder);
        });
      
        const bookPromises = allCarts.map(async (cart) => {
          const id = cart?.book_id || "";
          const book = await BuyBooks.findById(id) || {};
          return book;
        });
    
        const books = await Promise.all(bookPromises);
        
        const sellerOrders = allCarts.map((cart, index) => {
          return {
            cart,
            book: books[index] || "book not found"
          }
        }) 
        
        res.send({orders, sellerOrders})

    }catch (error) {
    console.error("Error getting seller orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}