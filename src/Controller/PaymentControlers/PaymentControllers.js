require("dotenv").config();
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

const { ObjectId } = require("mongodb");
const Carts = require("../../Models/Carts/Carts");
const Orders = require("../../Models/Orders/Orders");

exports.postOrder = async (req, res) => {
  console.log("order cliekdd");
  const userEmail = req?.body?.email;
  const filter = { user_email: userEmail };
  const carts = await Carts.find(filter);
  let totalBookPrice = 0;
  let totalBooks = 0;

  console.log("user email", userEmail);
  for (const cart of carts) {
    totalBookPrice += cart.price;
    totalBooks += cart.quantity;
  }
  const tran_id = new ObjectId().toString();

  const data = {
    total_amount: totalBookPrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/v1/success?tran_id=${tran_id}&email=${userEmail}`, //TODO: change the base url before deploy
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
    console.log(userEmail);
    const deleteCarts = await Carts.deleteMany(filter);
    console.log(deleteCarts);
    res.redirect("http://localhost:3000/dashboard/my-orders"); // TODO:  set live link before deploy
  }

  // res.send(deleteCarts);
};
