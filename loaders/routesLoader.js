const {  userRoutes } = require("../routes");


const routesLoader = (app) => {
  app.use("/auth", userRoutes); 
  
  console.log("Routes have been loaded.");
};

module.exports = routesLoader;
