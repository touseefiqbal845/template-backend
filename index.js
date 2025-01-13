


const express = require("express");
const path = require("path");
const loaders = require("./loaders");
const errorHandler = require("./utils/errorHandler");

const app = express();


const startApp = async () => {
  await loaders(app); 
  app.use(errorHandler);
  console.log("Application initialized.");
};

startApp();

// Optional static file serving, if needed for frontend
app.use(express.static(path.resolve(__dirname, 'build')));
app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));


// Start the server
const PORT =  "5002";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  console.log("Success");
  res.send("Hello, World!"); 
});


module.exports = app;