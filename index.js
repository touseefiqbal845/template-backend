// require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
// const connectDB = require('');

const app = express();

// Middleware
app.use(express.json());

// Database Connection

// Test Route
app.get('/', (req, res) => {
  res.status(200).send('API is running successfully');
});

const connectDB = () => {
  console.log('Attempting to connect to MongoDB...');
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  });
};
connectDB()

// Start the Server
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
