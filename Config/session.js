const session = require('express-session');
// const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();

const sessionConfig = (app) => {
  app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false,  // Set to false to avoid creating empty sessions
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
    cookie: {
      httpOnly: true,    // Prevents access via JavaScript
      secure: false,     // Set to true in production with HTTPS
      sameSite: 'None',  // Important for cross-origin requests
      maxAge: 1000 * 60 * 60 * 24,  // Session expiration (1 day)
    },
  }));
  
};

module.exports = sessionConfig;
