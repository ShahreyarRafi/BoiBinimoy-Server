const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token = await req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'unauthorized access' })
    }
    req.user = decoded;
    next();
  })
}

module.exports = verifyToken







// // my custom middileware
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyToken = (req, res, next) => {

//     if (!req.headers.authorization) {
//       return res.status(401).send({ message: 'unauthorized access' })
//     }
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, ((err, decoded) => {
//       if (err) {
//         return res.status(401).send({ message: 'forbidden access' })
//       }
//       req.decoded = decoded;
//       next();
//     }))
//   }

// module.exports = verifyToken
