const databaseLoader = require("./databaseLoader");
const expressLoader = require("./expressLoader");
const routesLoader = require("./routesLoader");
const passportConfig = require("../Config/passport");
const sessionConfig = require("../Config/session");
// const initDataLoader = require("./initDataLoader");


const initializeLoaders = async (app) => {
  await databaseLoader();
 
  expressLoader(app);
  sessionConfig(app);
  passportConfig();
  routesLoader(app);

  console.log("everything load");
};

module.exports = initializeLoaders;
