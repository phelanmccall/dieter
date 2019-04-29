// Passport //

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");
// const google = "GOOGLE";
const LocalStrategy = require('passport-local').Strategy;




// //Google//

// passport.use('google', new GoogleStrategy({
//   // options for google strategy
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
// },
//   // passport callback function
//   function (accessToken, refreshToken, profile, done) {
//     console.log(profile);
//     db.Auths.findOne({
//       where: { authModeId: profile.id }
//     }).then(function (existingUser) {
//       if (existingUser) {
  
//         done(null, existingUser);
//       } else {
//         db.Auths.create({
//           firstName: profile.displayName,
//           avatar: profile.photos[0].value,
//           authMode: google,
//           authModeID: profile.id
//         }).then(function (user) {
//          done(null, user);
//         });
//       }

//     });
//   }
// ));

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.Auths.findAll({})
    .then((dbAuths)=>{
      console.log(dbAuths)
      if(!dbAuths.length){
        db.Auths.create({
          username: username,
          password: bcrypt.hashSync(password)
        }).then((user)=>{
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              return done(null, user);
            } else {
              done(null, false);
            }
          } else {
            done(null, null);
          }
        }).catch((err)=>{
          console.log(err);
          done(null, null);

        })
      }else{
        db.Auths.findOne({
          where:{
            username: username
          }
        }).then((user)=>{
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
        .catch((err)=>{
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
    where: {
      id: id
    }
  }).then(function (user) {
    console.log("deserial")
    done(null, user);
  });
});