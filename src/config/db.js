const mongoose = require('mongoose');
require('dotenv').config();

const getConnectionString = () => {
    let connectionURI;
    if(process.env.NODE_ENV === 'development'){
        connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3ml6twf.mongodb.net/?retryWrites=true&w=majority`;
    } 
    else {
      connectionURI = process.env.DATABASE_PROD_URI;
    }
    return connectionURI;
}

const connectToDB = async() => {
    console.log('connecting to database ......');
    const uri = getConnectionString();
    await mongoose.connect(uri,{dbName: process.env.DB_NAME });
    console.log('connected to database');
}

module.exports = connectToDB