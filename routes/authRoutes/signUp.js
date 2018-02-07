const mongoose = require("mongoose");
require("../../model/user"); //import the schema
const User = mongoose.model("user"); //import the schema
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy; //define Strategy;

module.exports = (app, passport) => {
  app.post("/api/signUp", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;
    var address = req.body.address;
    if (username && password) {
      //not null.
      User.findOne({ username: username }, (error, user) => {
        if (user) {
          res.send({
            success: false,
            message: "User exsits already"
          });
        } else {
          User.register(
            // a function that comes with passport-local-mongoose.
            new User({
              username: req.body.username,
              role : req.body.role,
              address : req.body.address
            }),
            req.body.password,
            (error, user) => {
              if (error) {
                res.send("Account already exist");
              }
              passport.authenticate("local")(req, res, () => {
                res.json({
                  success: true,
                  message: "an account has been created for you"
                });
              });
            }
          );
        }
      });
    }
  });
};
