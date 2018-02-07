const mongoose = require("mongoose"); // import mongoose
require("../model/user"); //import the schema
const User = mongoose.model("user"); //import the schema
const keys = require("../config/keys");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy; //define the Strategy we are using.;


module.exports = (app, passport) => {
  passport.serializeUser((user, done) => {
    //generate the identifying piece of info, then it will be stuffed into the cookie.
    done(null, user.id); // even though it is _id in the database, but there's no need to change id to _id.
  }); //passport will know we are refering to _id.

  passport.deserializeUser((id, done) => {
    // get the stuff that was stuffed inside the cookie by serializeUser
    User.findById(id).then(user => {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy(User.authenticate())); // passport-local-mongoose boilerplate


};
