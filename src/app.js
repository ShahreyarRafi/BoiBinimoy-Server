const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");


const postBuyBookRoute = require("./Routes/BuyBooksRoutes/postBuyBookRoute");
const getAllBuyBooksRoute = require("./Routes/BuyBooksRoutes/getAllBuyBooksRoute");
const getOneBookRoute = require("./Routes/BuyBooksRoutes/getOneBookRoute");



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


// buy books related apis
app.use(postBuyBookRoute)
app.use(getAllBuyBooksRoute)
app.use(getOneBookRoute)


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
