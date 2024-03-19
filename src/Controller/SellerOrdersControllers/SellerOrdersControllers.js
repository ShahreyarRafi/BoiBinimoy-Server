const Carts = require("../../Models/Carts/Carts");
const Orders = require("../../Models/Orders/Orders");
const SellerOrders = require("../../Models/SellerOrders/SellerOrders");
const BuyBooks = require("../../Models/buyBooks/buyBooks");


exports.getSellerOrdersByEmail = async(req, res) => {
    try{
        const email = req.params.email;
        const query = {ownerEmail: email };
        const orders = await SellerOrders.find(query).sort({ orderDate: -1 });
        const sellerOrders = [];
        orders.forEach((order) => {
          const cartsInOrder = order.carts;
          sellerOrders.push(...cartsInOrder);
        });
        
        res.send({orders, sellerOrders})

    }catch (error) {
    console.error("Error getting seller orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// update delivery 

exports.updateDelivery = async(req, res) => {
  try{

    const bookIdToUpdate = req.params.book_id; 

    const deliverdOrder = await  SellerOrders.updateOne(
      {
        "carts.book_id": bookIdToUpdate,
      },
      {
        $set: {
          "carts.$.isDeliverd": true,
        },
      });

      await Orders.updateOne(
        {
          "carts.book_id": bookIdToUpdate,
        },
        {
          $set: {
            "carts.$.isDeliverd": true,
          },
        });
  
      // Respond with the updated order
      res.json({ message: "Cart updated successfully", deliverdOrder });
  }catch (error) {
    console.error("Error order delivery data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}