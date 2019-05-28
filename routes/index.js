const path = require("path");
const router = require("express").Router();
const db = require("../models");
require("../controller/passport");
const passport = require("passport");
router.use(function (req, res, next) {
  var { path } = req;
  var base = "/" + path.split("/")[1];
  var date;
  if (base === "/meals") {
    date = path.split("/")[2];
  }

  switch (base) {
    case "/":
    case "/login":
    case "/logout":
      next();
      break;

    // case "/services":
    // case "/info":
    //   if (req.method === "GET" || req.isAuthenticated()) {
    //     next();
    //     break;
    //   } else {
    //     res.redirect("/");
    //     break;
    //   }
    // case "/appointments":
    //   if (req.method === "POST" || date) {
    //     next();
    //     break;
    //   }
    //   break;

    default:
      if (!req.isAuthenticated()) {
        res.redirect("/");
        break;
      } else {
        next();
      }
      break;
  }

});

router.route("/login")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      res.send({ username: req.user.username });
    } else {
      res.send({});
    }
  })
  .post(passport.authenticate('local'), function (req, res) {
    if (req.isAuthenticated()) {
      res.send({ username: req.user.username });
    } else {

      res.redirect("/");
    }
  });

router.route("/logout").get(function (req, res) {
  req.logout();
  res.redirect("/");
})

router.route("/meals/:date").get(function(req, res){
  db.Plans.find({
    _id: req.user.id,
    date: req.params.date
  }).then((doc)=>{
    console.log(doc.toJSON())
  }).catch((err)=>{
    console.log(err);
    res.status(404).send();
  })
})


// If no API routes are hit, send the React app
router.use(function (req, res) {
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});

module.exports = router;
