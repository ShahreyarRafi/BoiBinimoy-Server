const express = require('express');
const createJwtToken = require('../../Controller/authentication/createJwtToken');
const jwtRoute = express.Router();

jwtRoute.post('/jwt', createJwtToken);

module.exports = jwtRoute