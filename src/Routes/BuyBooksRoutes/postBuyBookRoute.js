const express = require('express');
const BuyBooks = require('../../Models/buyBooks/buyBooks');
const postBuyBookRoute = express.Router();

postBuyBookRoute.post('/api/v1/buyBook', async(req, res) => {
    try{
        const book = req.body;
        const newBook  = new BuyBooks(book);
        const result = await newBook.save();
        console.log(result)
        res.status(200).json(result);
    }catch (error) {
        console.error('Error post book data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = postBuyBookRoute;