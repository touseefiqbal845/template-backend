const passport = require('passport');


const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", ""); 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};


const sessionAuth = passport.authenticate('session', { session: true });

module.exports = { jwtAuth, sessionAuth };
