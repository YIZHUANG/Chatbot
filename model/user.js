const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    firstname: String
});

userSchema.plugin(passportLocalMongoose);

mongoose.model("user", userSchema);
