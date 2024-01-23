const express = require('express');
const postUserRoute = express.Router();

postUserRoute.post("/api/v1/users", async(req, res) =>{
    try{
        

    } catch (error) {
        console.error('Error post book data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})