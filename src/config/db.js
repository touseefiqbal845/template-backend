const mongoose = require('mongoose');

const connectDB = () => {
    console.log('Attempting to connect to MongoDB...');
  mongoose
    .connect("mongodb+srv://touseefiqbal845:Punjabuni321@easypickercluster.pzxaxac.mongodb.net/?retryWrites=true&w=majority&appName=easyPickerCluster")
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
      console.error(`MongoDB connection error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDB;
