const mongoose = require("mongoose");
require("../../model/user"); //import the schema
const User = mongoose.model("user"); //import the schema
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy; //define Strategy;

module.exports = (app, passport) => {
  app.post("/api/signUp", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
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
              username: req.body.username
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


  app.put('/api/user/:userId',(req,res) => {
    const user=new User();
    var role = req.body.role;
    var address = req.body.address;
    if(!role||!address){
      res.status(500).send({error:"Your role or address mush have some text"});
    }else{
      User.findOne({_id:req.params.userId},(error,user) => {
        if(error){
          res.status(500).send({error:'could not find user'});
        }else{
          User.update({_id:req.params.userId},{$set:{role:role,address:address}},(error,user) => {
            if(error){
              res.status(500).send({error:"something went wrong,perhaps the user dose not exsit"});
            }else{
              res.send("success updated");
            }
          });
        }
      });
    }
  });

};
