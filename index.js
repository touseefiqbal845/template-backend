// require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.status(200).send('API is running successfully');
});

// Start the Server
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
