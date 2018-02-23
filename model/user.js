const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  address: String,
  google: {
    googleId: String,
    name: String,
    email: String
  }
});

userSchema.plugin(passportLocalMongoose);

mongoose.model("user", userSchema);
