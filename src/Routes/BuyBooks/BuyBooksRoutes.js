const express = require("express");
const BuyBooks = require("../../Models/buyBooks/buyBooks");
const mongoose = require('mongoose');
const { getAllBuyBookController, getOneBookController, postBuyBookController } = require("../../Controller/BuyBooksControllers/BuyBooksControllers");


const getAllBuyBooksRoute = express.Router();
getAllBuyBooksRoute.get("/buyBooks", getAllBuyBookController);


const getOneBookRoute = express.Router();
getOneBookRoute.get("/buyBooks/:id", getOneBookController );


const postBuyBookRoute = express.Router();
postBuyBookRoute.post('/buyBooks', postBuyBookController);


module.exports = { getAllBuyBooksRoute, getOneBookRoute , postBuyBookRoute }