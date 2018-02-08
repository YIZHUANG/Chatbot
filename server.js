const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const morgan = require("morgan");
const mongoose = require("mongoose");

const passport = require("passport"); //tell express to make use of cookies
var LocalStrategy = require("passport-local").Strategy;

const keys = require("./config/keys"); //where all the secrets / keys are stored.

mongoose.connect(keys.mongoURL); // use your own URL.

const app = express();

const cors = require("cors");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(morgan("dev")); // this allows every request to be displayed on the console for easier debug.
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


require("./services/chatbot")(app);  //chatbot

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets.
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
