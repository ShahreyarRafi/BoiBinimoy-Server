require("dotenv").config();
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

const { ObjectId } = require("mongodb");
const Carts = require("../../Models/Carts/Carts");
const Orders = require("../../Models/Orders/Orders");
const BuyBooks = require("../../Models/buyBooks/buyBooks");
const { default: mongoose } = require("mongoose");
const SellerOrders = require("../../Models/SellerOrders/SellerOrders");

exports.postOrder = async (req, res) => {
  const userEmail = req?.body?.email;
  const filter = { user_email: userEmail };
  const carts = await Carts.find(filter);
  let totalBookPrice = 0;
  let totalBooks = 0;

  for (const cart of carts) {
    totalBookPrice += cart.price;
    totalBooks += cart.quantity;
  }
  const tran_id = new ObjectId().toString();

  const data = {
    total_amount: totalBookPrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `https://boi-binimoy-server.vercel.app/api/v1/success?tran_id=${tran_id}&email=${userEmail}`, //TODO: change the base url before deploy
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Book",
    product_profile: "gebneral",
    cus_name: "Customer Name",
    cus_email: userEmail,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  sslcz.init(data).then(async (apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });

    const finalOrder = {
      carts,
      tranjectionId: tran_id,
      isPaid: false,
      isDeliverd: false,
      totalBooks,
      totalPrice: totalBookPrice,
      clientEmail: userEmail,
    };

    const newOrder = new Orders(finalOrder);
    await newOrder.save();
    //  res.send(order)
  });
};

exports.postSuccess = async (req, res) => {
  console.log("success");
  const tranId = req.query.tran_id;
  const userEmail = req.query.email;
  const query = { tranjectionId: tranId };
  const updateOrder = await Orders.updateOne(query, {
    $set: {
      isPaid: true,
    },
  });

  if (updateOrder.modifiedCount >= 1) {
    const filter = { user_email: userEmail };
    const carts = await Carts.find(filter);

    carts.map(async (cart) => {
      const query = { _id: new mongoose.Types.ObjectId(cart?.book_id) };
      const book = await BuyBooks.findById(query);
      let stock_limit = book?.stock_limit;

    await BuyBooks.updateOne(query, {
        $set: {
          stock_limit: stock_limit - cart?.quantity,
        },
      });
    });
    await Carts.deleteMany(filter);

    // this part for individual sellers
    const order = await Orders.findOne(query);
    const orderCarts = order?.carts;

    const { tranjectionId, isPaid, isDeliverd, clientEmail } = order;
    let totalBooks = 0,
      totalPrice = 0;

    const booksCartsByOwner = {};

    // Iterate through each cart in the order

    orderCarts.forEach((cart) => {
      const ownerEmail = cart.owner_email;

      // If the owner_email is not a key in the booksCartsByOwner object, create it
      if (!booksCartsByOwner[ownerEmail]) {
        booksCartsByOwner[ownerEmail] = [];
      }
      // Add the cart to the corresponding owner's array
      booksCartsByOwner[ownerEmail].push(cart);
      totalBooks += cart.quantity;
      totalPrice += cart.price;
    });

    // Iterate through each owner_email and distribute the payment
    for (const ownerEmail in booksCartsByOwner) {
      const ownerCarts = booksCartsByOwner[ownerEmail];
      console.log('ownerCarts; ', ownerCarts);
      const ownerTotalPrice = ownerCarts.reduce(
        (total, cart) => total + cart.price,
        0
      );

      const sellerOrder = {
        carts: ownerCarts,
        tranjectionId,
        isPaid,
        isDeliverd,
        totalBooks: ownerCarts.reduce(
          (total, cart) => total + cart.quantity,
          0
        ),
        totalPrice: ownerTotalPrice,
        clientEmail,
        ownerEmail,
      };

      const newSellerOrder = new SellerOrders(sellerOrder);
      await newSellerOrder.save();
    }

    res.redirect("https://boibinimoy.netlify.app/dashboard/my-orders"); // TODO:  set live link before deploy
  }
  // res.send(deleteCarts);
};
