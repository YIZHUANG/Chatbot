const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const keys = require("./config/keys");

mongoose.connect(keys.mongoURL);

const app = express();
const cors = require("cors");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./model/user");
require("./services/passport")(app, passport);
require("./routes/authRoutes/signUp")(app, passport);
require("./routes/authRoutes/signIn")(app, passport);
require("./routes/chatbot/chatbot")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server is running at port " + PORT);
});
