const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// payment getway intregration
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

const corsOptions = {
  origin: [
    "*",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://boibinimoy.netlify.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

const jwtRoute = require("./Routes/jwt/jwtRoute");

const bannerRouter = require("./Routes/BannerRoutes/BannerRoutes");
const usersRoute = require("./Routes/Users/usersRoutes");
const exchangeBooksRouter = require("./Routes/ExchangeBooksRoutes/ExchangeBooksRoutes");
const requestBooksRouter = require("./Routes/RequestBooks/RequestBooks");
const buyBookRouter = require("./Routes/BuyBooks/BuyBooksRoutes");
const reviewsRouter = require("./Routes/ReviewsRoutes/ReviewsRoutes");
const blogsRouter = require("./Routes/BlogsRoute/BlogsRoute");
const categoryRouter = require("./Routes/CategoryRouter/CategoryRouter");
const writerRouter = require("./Routes/WriterRouters/WriterRouters");
const publisherRouter = require("./Routes/PublisherRouter/PublisherRouter");
const CartsRouter = require("./Routes/CartsRoutes/CartsRoutes");
const Carts = require("./Models/Carts/Carts");
const { ObjectId } = require("mongodb");

// middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to My Boi binimoy Server" });
});

// authentication routes
app.use(jwtRoute);

// banner slider related apis
app.use("/api/v1", bannerRouter);

// users related api
app.use("/api/v1", usersRoute);

// exchange books related apis
app.use("/api/v1", exchangeBooksRouter);

// request book exchange related apis
app.use("/api/v1", requestBooksRouter);

// buy book related apis
app.use("/api/v1", buyBookRouter);

// add to carts  related apis
app.use("/api/v1", CartsRouter);

// reviews of buy book related apis
app.use("/api/v1", reviewsRouter);

// blogs related apis
app.use("/api/v1/", blogsRouter);

// category related apis
app.use("/api/v1", categoryRouter);

// writer related apis
app.use("/api/v1", writerRouter);

// publishers related apis
app.use("/api/v1", publisherRouter);

// payment related routes

app.post("/api/v1/order", async (req, res) => {
  const userEmail = req?.body?.email;
  const filter = { user_email: userEmail };
  const carts = await Carts.find(filter);
  let cus_email = "";
  let totalBookPrice = 0;
  for (const cart of carts) {
    for (const book of cart.books) {
      cus_email = book?.user_email
      totalCartPrice += book.price;
    }
  }

  const tran_id = new ObjectId().toString();

  const data = {
    total_amount: totalBookPrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:3030/success/${tran_id}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "gebneral",
    cus_name: "Customer Name",
    cus_email: cus_email,
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

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL
      res.send({url: GatewayPageURL})
  });

  app.post("/api/v1/success/:tran_id", async(req, res) => {

  });

});



app.get("*", (req, res) => {
  res.status(401).json({ message: "Sorry Invalid URL" });
});

// client site error
app.use((req, res, next) => {
  next(createError(404, { message: "route not found" }));
});

// server error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
