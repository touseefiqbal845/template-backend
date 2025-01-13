const express = require('express');
// const cors = require('cors');

const expressLoader = (app) => {
//   app.use(cors()); 
  app.use(express.json()); 
  return app;
};

module.exports = expressLoader;
