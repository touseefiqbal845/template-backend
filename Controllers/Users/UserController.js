const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");
const { sanitizeUser, sendMail } = require("../../services/common");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const createUser = async (req, res) => {
  try {
  console.log("user in login1",req);

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
  console.log("user in login2",user);

        const doc = await user.save();
        console.log("user in login3",doc);


        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(
              sanitizeUser(doc),
              process.env.JWT_SECRET_KEY
            );
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (err) {
    
    res.status(400).json(err);
  }
};

const loginUser = async (req, res) => {
  const user = req.user;
  console.log("user in login", user);

  const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res
    .cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};

const logout = async (req, res, next) => {
  try {
    res
      .cookie("jwt", null, { expires: new Date(Date.now()), httpOnly: true })
      .status(200)
      .send("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
    return next(new Error("Logout failed"));
  }
};

const checkAuth = async (req, res) => {
  console.log("Session Cookies:", req.cookies);  // Log cookies to verify they are sent
  console.log("User Object:", req.user);  // Log user object to verify the session is being authenticated

  console.log("checkAuth",req.user)
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

const resetPasswordRequest = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    // Also set token in email
    const resetPageLink =
      "http://localhost:3000/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for e-commerce";
    console.log("link", resetPageLink);
    const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

const resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  console.log("123");

  const user = await User.findOne({ email: email, resetPasswordToken: token });
  console.log("121", user);

  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        console.log("1221");

        const subject = "password successfully reset for e-commerce";
        const html = `<p>Successfully able to Reset Password</p>`;
        if (email) {
          const response = await sendMail({ to: email, subject, html });
          res.json(response);
        } else {
          res.sendStatus(400);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
};

module.exports = {
  createUser,
  loginUser,
  logout,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
};
