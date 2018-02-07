const mongoose = require("mongoose");
require("../../model/user"); //import the schema
const User = mongoose.model("user"); //import the schema
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy; //define Strategy;

module.exports = (app, passport) => {
  app.post("/api/signUp", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var height = req.body.height;
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
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              height: req.body.height
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
