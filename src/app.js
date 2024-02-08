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
  origin: ["*", "http://localhost:3000", "https://boibinimoy.netlify.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

const jwtRoute = require("./Routes/jwt/jwtRoute");

const exchangeBooksRouter = require("./Routes/ExchangeBooksRoutes/ExchangeBooksRoutes");
const buyBookRouter = require("./Routes/BuyBooks/BuyBooksRoutes");
const bannerRouter = require("./Routes/BannerRoutes/BannerRoutes");
const usersRoute = require("./Routes/Users/usersRoutes");
const blogsRouter = require("./Routes/BlogsRoute/BlogsRoute");
const requestBooksRouter = require("./Routes/RequestBooks/RequestBooks");

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


// blogs related apis
app.use("/api/v1/", blogsRouter);



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
