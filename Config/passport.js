const passport = require("passport");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../modals/User");
// const JWT_SECRET = process.env.JWT_SECRET_KEY;

const passportConfig = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        secretOrKey: 'jjj',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (payload, done) => {
        console.log("jwt0")

        try {
          console.log("jwt")
          const user = await User.findById(payload.id);
          console.log("jwt1")

          if (!user) {

            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {

          const user = await User.findOne({ email });
          console.log("im",user);

          if (!user) {

            return done(null, false, { message: "User not found" });
          }

          crypto.pbkdf2(
            password,
            user.salt,
            310000,
            32,
            "sha256",
            (err, hashedPassword) => {
              if (err) return done(err);

              if (!crypto.timingSafeEqual(user.password, hashedPassword)) {

                return done(null, false, { message: "Invalid password" });
              }

              return done(null, user);
            }
          );
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    console.log('Serialize User:', user); // Check what is being passed here
    cb(null, user.id); // Store the user ID in the session (not the whole user object)
  });
  
  passport.deserializeUser(async (id, cb) => {
    console.log('Deserialize User ID:', id); // Log the user ID passed
    try {
      const user = await User.findById(id); // Fetch the full user object using the ID
      console.log('Deserialized User:', user); // Log the deserialized user
      cb(null, user); // Attach the user object to the session
    } catch (err) {
      console.error('Error deserializing user:', err); // Log any errors that occur during deserialization
      cb(err);
    }
  });
  
}
module.exports = passportConfig;
