const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://touseefhacker:touseefhacker@cluster0.fachd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{  serverSelectionTimeoutMS: 60000});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDBmmmmmmm", error.message);
  }
};

module.exports = connectDB;
