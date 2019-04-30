// Passport //

const passport = require("passport");
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.Auths.find({})
      .then((dbAuths) => {
        console.log(dbAuths)
        if (!dbAuths.length) {
          db.Auths.insertOne({
            username: username,
            password: bcrypt.hashSync(password)
          }).then((doc) => {
            db.Auths.findOne({
              _id: doc.insertId
            }).then((user) => {
              if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                  return done(null, user);
                } else {
                  done(null, false);
                }
              } else {
                done(null, null);
              }
            }).catch((err) => {
              console.log(err);
              done(null, null);
            })
          }).catch((err) => {
            console.log(err);
            done(null, null);

          })
        } else {
          db.Auths.findOne({
            username: username
          }
          ).then((user) => {
            if (user) {
              if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
              } else {
                done(null, false);
              }
            } else {
              done(null, null);
            }
          })
            .catch((err) => {
              console.log(err);
              done(null, null);

            })
        }


      })
      .catch(function (err) {
        console.log(err);
        done(null, null);
      });
  }
));


// authenticate session persistence
passport.serializeUser(function (user, done) {

  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  console.log("deserial = " + id);
  db.Auths.findOne({
    _id: id
  }).then(function (user) {
    console.log("deserial")
    done(null, user);
  });
});