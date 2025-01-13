const express = require('express');
const passport = require('passport');
const { userController } = require('../Controllers');
const { jwtAuth,sessionAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', passport.authenticate('local'), userController.loginUser);
router.get('/profile', passport.authenticate("jwt"), userController.checkAuth);

router.get('/dashboardd', (req, res) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session Cookie:", req.cookies['connect.sid']);  // Log the session cookie
    console.log("User from session:", req.user);  // Should be populated if session is working correctly
    
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).send('Unauthorized');
    }
  });
  
  
router.get('/protected-route',sessionAuth, userController.checkAuth, (req, res) => {
    res.status(200).json({
      success: true,
      message: "Access granted to protected route",
      user: req.user,
    });
  });
router.get('/logout', userController.logout);
router.post("/reset-password-request", userController.resetPasswordRequest)
router.post("/reset-password", userController.resetPassword);

module.exports = router;
