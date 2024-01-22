const { mongoose } = require("mongoose");
const { mongoDBUrl } = require("../../secret");

const dbConnection = async (options = {}) => {
    try {
        await mongoose.connect(mongoDBUrl, options);
        console.log("Connection to MongoDB is successfully esablished");
        mongoose.connection.on("error", (error) => {
            console.error("MongoDB Connection error", error);
        });
    } catch (error) {
        console.error("Couldnot conneciton to MongoDB: ", error.toString());
    }
};

module.exports = dbConnection;
