'use strict';

require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models');

passport.serializeUser((user, done) => {
  done(null, user[0].dataValues.googleId);
});

passport.deserializeUser((id, done) => {
  db.User.findOne({ where: { googleId: id } }).then(user => {
    done(null, user);
  });
});
console.log('before call Oath. google client id: ', process.env.GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
      db.User.findOrCreate({
        where: {
          googleId: profile.id,
          username: profile.displayName,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName
        },
        defaults: {
          googleId: profile.id,
          username: profile.displayName,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName
        }
      })
        .then((user, err) => {
          console.log('Oath success. user: ', user);
          return done(null, user);
        })
        .catch(err => {
          console.log("Oauth error: ", err);  
        });
    } 
  )
);

module.exports = passport;
