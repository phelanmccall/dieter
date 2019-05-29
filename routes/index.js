const path = require("path");
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt-nodejs");

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
    case "/signup":
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

router.route("/signup")
  .get(function (req, res) {
    res.redirect("/");
  })
  .post(function (req, res) {
    db.Auths.findOne({
      username: req.body.username
    }).then((doc) => {
      if (doc) {
        res.send("Error: Username already taken.")
      } else {
        db.Auths.create({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password)
        }).then((doc) => {
          res.send(doc)
        }).catch((err) => {
          res.send(err);
        })
      }
    }).catch((err) => {
      res.send(err);
    })
  })

router.route("/login")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      res.send(req.user);
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

router.route("/meals/:date").get(function (req, res) {
  db.Plans.find({
    _id: req.user.id,
    date: req.params.date
  }).then((doc) => {
    console.log(doc.toJSON())
  }).catch((err) => {
    console.log(err);
    res.status(404).send();
  })
})
router.route("/myRecipes")
  .get(function (req, res) {
    db.Recipes.find({
      userID: req.user.id
    }).then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send(err);
    })
  })

router.route("/all/recipes")
  .get(function (req, res) {
    db.Recipes.find().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send(err);
    })
  })

router.route("/add/recipe")
  .post(function (req, res) {
    console.log(req.body);
    db.Recipes.create({
      title: req.body.title,
      steps: req.body.steps,
      ingredients: req.body.ingredients,
      userID: req.user._id
    }).then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send(err);
    })
  })


// If no API routes are hit, send the React app
router.use(function (req, res) {
  console.log(Object.keys(db.Recipes))
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});

module.exports = router;
