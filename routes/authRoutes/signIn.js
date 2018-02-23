const mongoose = require("mongoose");
require("../../model/user");

const User = mongoose.model("user");

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = (app, passport) => {
  app.post("/api/signIn", passport.authenticate("local"), (req, res) => {
    res.json({ success: true });
  });

  app.get(
    "/api/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/api/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/DashBoard");
    }
  );

  app.get("/api/users", (req, res) => {
    User.find({}).then(eachOne => {
      res.json(eachOne);
    });
  });

  app.get("/api/current_user", (req, res) => {
    //determine whether user is signed in or not
    res.json(req.user); // in the client side
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(null);
  });
};
