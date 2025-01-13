const mongoose = require("mongoose");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const { User } = require("../modals/User");
const { sanitizeUser } = require("../services/common");


exports.createUser = async (req, res) => {
    try {
      console.log("Request Body:", req.body); 
  
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        req.body.password, 
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
  
          try {
            const user = new User({ ...req.body, password: hashedPassword, salt });
            console.log("user",{user})
            const doc = await user.save();
  
            req.login(sanitizeUser(doc), (err) => {
              if (err) {
                console.error("Error logging in user:", err);
                return res.status(400).json({ error: "Login failed" });
              }
  
              console.log("User created successfully:", doc);
              const token = jwt.sign(
                sanitizeUser(doc),
                process.env.JWT_SECRET_KEY
              );
              res.cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              }).status(201).json({ id: doc.id, role: doc.role });
            });
          } catch (saveError) {
            console.error("Error saving user to database:", saveError);
            return res.status(500).json({ error: "Error saving user to database" });
          }
        }
      );
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(400).json({ error: "Bad request" });
    }
  };


  exports.loginUser = async (req, res) => {
    const user = req.user;
    res
      .cookie("jwt", user.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(201)
      .json({ id: user.id, role: user.role });
  };
  

  exports.logout = async (req, res) => {
    res
      .cookie("jwt", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .sendStatus(200);
  };
  
  exports.checkAuth = async (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.sendStatus(401);
    }
  };