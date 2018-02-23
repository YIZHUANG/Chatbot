const mongoose = require("mongoose");
require("../model/user");
const User = mongoose.model("user");
const keys = require("../config/keys");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (app, passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy(User.authenticate()));

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/api/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ "google.googleId": profile.id }).then(existingUser => {
          if (existingUser) {
            return done(null, existingUser);
          } else {
            var newUser = new User();
            newUser.google.googleId = profile.id;
            newUser.username = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            newUser.save(error => {
              if (error) {
                throw error;
              }
              return done(null, newUser);
            });
          }
        });
      }
    )
  );
};
