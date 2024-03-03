const Carts = require("../../Models/Carts/Carts");
const Orders = require("../../Models/Orders/Orders");
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


// update delivery 

exports.updateDelivery = async(req, res) => {
  try{
    const cartId = req.params.cartId;
      const order = await SellerOrders.findOne({ "carts._id": cartId });
  
      // Check if the order exists
      if (!order) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Find the specific cart within the order
      const cartToUpdate = order.carts.find((cart) => cart._id == cartId);
  
      // Update isDelivered to true
      if (cartToUpdate) {
        cartToUpdate.isDeliverd = true;
      } else {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Save the updated order
      await order.save();
  
      // Respond with the updated order
      res.json({ message: "Cart updated successfully", order });
  }catch (error) {
    console.error("Error order delivery data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}