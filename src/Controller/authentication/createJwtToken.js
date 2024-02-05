const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJwtToken = async (req, res) => {
  try {
    const user = await req.body;
    console.log(user);
    const token =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    });

    res
      .cookie('token', token, {
        httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false , 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({ success: true, token })
  } catch (error) {
    console.error('Error getting token: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

  module.exports = createJwtToken;


// const generateToken = require("../../Utils/generateToken");

// const createJwtToken = async (req, res) => {
//     try {
//       const user = req.body;
//       const token = generateToken(user);
//       // res.status(200).json(token);
//       res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: false, // TODO:  true for live side 
//         sameSite: 'none'
//       })
//       .send({ success: true })
//     } catch (error) {
//       console.error('Error jwt token create :', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   module.exports = createJwtToken;