const express = require('express');
const Users = require('../../Models/Users/Users');
const postUserRoute = express.Router();

postUserRoute.post("/api/v1/users", async(req, res) =>{
    try{
        const user = req.body;
        const newUser  = new Users(user);
        const result = await newUser.save();
        res.send(result);
    } catch (error) {
        console.error('Error post user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = postUserRoute;