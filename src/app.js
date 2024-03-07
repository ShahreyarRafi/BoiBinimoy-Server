const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
const PaymentRouter = require("./Routes/PaymentRoutes/PaymentRoutes");
const OrdersRouter = require("./Routes/OrdersRouter/OrdersRouter");
const SellerOrdersRouter = require("./Routes/SellerOrdersRouter/SellerOrdersRouter");
const messageRouter = require("./Routes/MessageRouter/MessageRouter");
const wishlistRouter = require("./Routes/WishlistRouter/WishlistRouter");
const adminDashboardRouters = require("./Routes/AdminDashboardRoutes/AdminDashboardRoutes");
const userDashboardRouters = require("./Routes/UserDashboardRouters/UserDashboardRouters");

// middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(xss());
// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   limit: 10000, // Limit each IP to 10000 requests per `window` (here, per 5 minutes).
//   standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//   // store: ... , // Use an external store for consistency across multiple server instances.
// });
// app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to My Boi binimoy Server" });
});

// authentication routes
app.use(jwtRoute);

// banner slider related apis
app.use("/api/v1", bannerRouter);

// users related api
app.use("/api/v1", usersRoute);

// message related api
app.use("/api/v1", messageRouter);

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
app.use("/api/v1", PaymentRouter);

// Orders related api
app.use("/api/v1", OrdersRouter);

// seller orders router
app.use("/api/v1", SellerOrdersRouter);

// wishlist related apis
app.use("/api/v1", wishlistRouter);

// admin dashboard related apis
app.use("/api/v1", adminDashboardRouters);

// user dashboard related apis
app.use("/api/v1", userDashboardRouters);

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
