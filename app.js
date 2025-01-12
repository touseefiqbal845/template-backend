const express = require('express');
const loadServices = require('./src/loaders');

const app = express();

loadServices(app);

module.exports = app;
