const connectDB = require("../config/db");

const mongooseLoader = () => {
  connectDB();
};

module.exports = mongooseLoader;
