const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const keys = require("../config/keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.tokenKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //verify if user exists using info from decoded payload (jwt_payload)

      User.findById(jwt_payload.id)
        .then(user => {
          if (!user) {
            return done(null, false, {
              Authentication: "Unauthorized access detected!"
            });
          } else {
            return done(null, user);
          }
        })
        .catch(err => console.log(`AUTHENTICATION ERROR: ${err}`));
    })
  );
};
