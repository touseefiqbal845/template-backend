const mongoose = require("mongoose");
const dotenv = require('dotenv');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{  serverSelectionTimeoutMS: 60000});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDBmmmmmmm", error.message);
  }
};

module.exports = connectDB;
