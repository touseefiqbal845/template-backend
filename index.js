


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
const PORT = process.env.PORT || "https://tasky-backend-eosin.vercel.app/";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  console.log("Success");
  res.send("Hello, World!"); 
});


module.exports = app;



// const app = require("./app");

// const PORT = process.env.PORT || ;



// app.use(express.static(path.resolve(__dirname, 'build')));
// app.get("*", (req, res) =>
// res.sendFile(path.resolve("build", "index.html"))
// );


// app.get("/", (req, res) => {
//   console.log("Success");
//   res.send("Hello, World!"); 
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


















// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const crypto = require("crypto");
// const session = require("express-session");
// const LocalStrategy = require("passport-local").Strategy;
// const JwtStrategy = require("passport-jwt").Strategy;
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const http = require('http');
// const { Server } = require("socket.io");

// const passport = require("passport");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// const { sanitizeUser, cookieExtractor } = require("./services/common");
// const authRouter = require("./routes/Auth");
// const { User } = require("./modals/User");

// const server = express();


// var opts = {};
// opts.jwtFromRequest = cookieExtractor;
// opts.secretOrKey = process.env.JWT_SECRET_KEY;
// // server.use(cors());
// server.use(
//   session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// server.use(bodyParser.json());
// server.use(cookieParser());
// server.use(passport.initialize());
// server.use(passport.session());


// server.use(passport.authenticate("session"));
// server.use("/auth", authRouter.router);

// const serverIO = http.createServer(server);

// const io = new Server(serverIO, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//   },
// });
// // console.log(io);



// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   }); 

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });
 
// // Passport Strategies 
// passport.use(
//   "local",
//   new LocalStrategy({ usernameField: "email" }, async function (
//     email,
//     password,
//     done
//   ) {
//     console.log({ email, password });
//     try {
//       const user = await User.findOne({ email: email });
//       console.log(email, password, user);
//       if (!user) {
//         console.log(email, password);

//         return done(null, false, { message: "invalid credentials" });
//       }
//       crypto.pbkdf2(
//         password,
//         user.salt,
//         310000,
//         32,
//         "sha256",
//         async function (err, hashedPassword) {
//           if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
//             return done(null, false, { message: "invalid credentials" });
//           }
//           const token = jwt.sign(
//             sanitizeUser(user),
//             process.env.JWT_SECRET_KEY
//           );
//           done(null, { id: user.id, role: user.role, token });
//         }
//       );
//     } catch (err) {
//       done(err);
//     }
//   })
// );

// passport.use(
//   "jwt",
//   new JwtStrategy(opts, async function (jwt_payload, done) {
//     try {
//       const user = await User.findById(jwt_payload.id);
//       if (user) {
//         return done(null, sanitizeUser(user));
//       } else {
//         return done(null, false);
//       }
//     } catch (err) {
//       console.error("Error finding user:", err);
//       return done(err, false);
//     }
//   })
// );

// passport.serializeUser(function (user, cb) {

//   process.nextTick(function () {
//     return cb(null, { id: user.id, role: user.role });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

// io.listen(process.env.PORT, () => {
//   console.log(`the server is started at ${process.env.PORT} port`);
// });

// const main = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_DB_URL);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// };

// main();

// server.get("/", (req, res) => {
//   res.json({ status: "success" });
// });
