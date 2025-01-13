const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");


const loadServices = (app) => {
  mongooseLoader();
  expressLoader(app);

};

module.exports = loadServices;
