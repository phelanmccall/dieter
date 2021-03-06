
require("dotenv").config(); 
require("./controller/passport");

const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 5000;
app.use(express.static("client/build"));
app.use(function (req, res, next) {
  if (req.url != '/favicon.ico') {
    return next();
  } else {
    res.status(200);
    res.header('Content-Type', 'image/x-icon');
    res.header('Cache-Control', 'max-age=4294880896');
    res.end();
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(require("cookie-parser")());

app.use(
  session({
    key: "sid",
    secret: process.env.SESSION_SECRET || "random",
    resave: false,
    saveUnititialized: false,
    cookie: {
      expires: 1000000,
      secure: false
    }
  })

);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("client/build"));
app.use(routes);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dieter", { useNewUrlParser: true }).catch((err) => {
  console.log(err.message)
});



app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
