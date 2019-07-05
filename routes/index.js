const path = require("path");
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt-nodejs");
const axios = require("axios");
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
});

router.route("/:username")
  .delete(function (req, res) {
    if (req.user.username === req.params.username) {
      db.Auths.deleteOne({
        username: req.user.username
      }).then((doc) => {
        console.log("Deleted: " + doc);
        res.send(doc);
      }).catch((err) => {
        console.log(err);
        res.send(err);
      })
    }

  })
router.route("/meals/:date").get(function (req, res) {
  db.Plans.findOne({
    user: req.user.username,
    date: req.params.date
  }).then((plan) => {
    if (plan) {
      res.send(plan);
    } else {
      res.send({ breakfast: [], lunch: [], dinner: [] });
    }
  }).catch((err) => {
    console.log(err);
    res.status(404).send();
  })
})

router.route("/add/plans")
  .post(function (req, res) {
    let { date, breakfast, lunch, dinner } = req.body;
    let user = req.user.username;

    db.Plans.findOneAndUpdate({
      date,
      user
    },
      { breakfast, lunch, dinner },
      {
        upsert: true,
        returnNewDocument: true
      }).then((plan) => {
        res.send(plan);
      }).catch((err) => {
        res.send(err);
      })
  })

router.route("/myRecipes")
  .get(function (req, res) {
    db.Recipes.find({
      user: req.user.username
    }).then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send(err);
    })
  })
router.route("/getRecipesByIngredients")
  .get(function (req, res) {
    let searchURL ="https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ignorePantry=false&ingredients=";
    axios({
      url: searchURL + req.query.ingredients,
      method: "get",
      headers: {
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPID_KEY
      }
    }).then((response) => {
      console.log(response.data);
      
      res.send(response.data);
    }).catch((err)=>{
      console.log(err);
      res.send(err);
    });
  })
router.route("/getRecipeById")
  .get(function(req, res){
    let searchURL =`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.query.id}/information`;
    axios({
      url: searchURL,
      method: "get",
      headers: {
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPID_KEY
      }
    }).then((response) => {
      console.log(response.data);
      
        let title = response.data.title;
        let steps = response.data.instructions.split(". ");
        let ingredients = response.data.extendedIngredients.map(function(val, ind){
          return val.originalString;
        })
        let formatted = {
          title,
          steps,
          ingredients
        }
      res.send(formatted);
    }).catch((err)=>{
      console.log(err.Error)
      res.send({
        title: "Error"
      });
    });
  })
// router.route("/all/recipes")
//   .get(function (req, res) {
//     db.Recipes.find().then((data) => {
//       res.send(data)
//     }).catch((err) => {
//       res.send(err);
//     })
//   })

router.route("/add/recipe")
  .post(function (req, res) {
    let { title, steps, ingredients } = req.body;
    let user = req.user.username;

    let conditions = {
      title,
      user
    };

    let update = {
      title,
      steps,
      ingredients,
      user
    }

    db.Recipes.findOne(conditions).then((data) => {
      if (data) {
        res.send("Error: recipe title already exists.")
      } else {

        db.Recipes.create(update).then((rx) => {
          res.send(rx);
        }).catch((err) => {
          res.send(err);
        })
      }
    }).catch((err) => {
      res.send(err);
    })
  })
  .put(function (req, res) {
    let { id, title, steps, ingredients } = req.body;
    let user = req.user.username;
    let conditions = {
      _id: id,
      user
    };

    let update = {
      title,
      steps,
      ingredients
    }

    db.Recipes.findOneAndUpdate(conditions, update, { upsert: true }).then((rx) => {
      res.send(rx);
    }).catch((err) => {
      res.send(err);
    })
  });

router.route("/delete/recipe/:id")
  .delete(function (req, res) {
    db.Recipes.findOneAndRemove({
      _id: req.params.id,
      user: req.user.username
    }).then((rx) => {
      res.send(200);
    }).catch((err) => {
      res.send(err);
    })
  })

// If no API routes are hit, send the React app
router.use(function (req, res) {
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});

module.exports = router;
