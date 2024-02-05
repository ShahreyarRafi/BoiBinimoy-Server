const express = require("express");
const BuyBooks = require("../../Models/buyBooks/buyBooks");
const mongoose = require('mongoose');
const { getAllBuyBookController, getOneBookController, postBuyBookController, updateBuyBook, deleteBuyBook } = require("../../Controller/BuyBooksControllers/BuyBooksControllers");


const getAllBuyBooksRoute = express.Router();
getAllBuyBooksRoute.get("/buyBooks", getAllBuyBookController);


const getOneBookRoute = express.Router();
getOneBookRoute.get("/buyBooks/:id", getOneBookController );


const postBuyBookRoute = express.Router();
postBuyBookRoute.post('/buyBooks', postBuyBookController);


const updateBuyBookRoute = express.Router();
updateBuyBookRoute.patch('/buyBooks/:id', updateBuyBook);

const deleteBuyBookRoute = express.Router();
deleteBuyBookRoute.delete('/buyBooks/:id', deleteBuyBook);


module.exports = { getAllBuyBooksRoute, getOneBookRoute , postBuyBookRoute, updateBuyBookRoute, deleteBuyBookRoute }