"use strict";

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var passport         = require('passport');
// load up the user model
var User            = require('../models/applicant');

module.exports.fireUpPassport = function() {
    // passport session setup ==================================================
    // required for persistent login sessions

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({email: email}, function(err, user) {
        if (err) {
          return done(new Error("No user found with those credentials"));
        };
        if (!user){
          return done(null, false, console.log('No User Found'));
        };
        if (!user.validPassword(password)){
          return done(null, false, console.log('Wrong Password'));
        };
        return done(null, user);
      });
    }));
};

module.exports.authenticateUser = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      return res.status(401).end();
    }
    req.logIn(user, function(err) {
      return res.status(200).end();
    });
  })(req, res, next);
}

module.exports.unauthUser =  function(req, res) {
  req.logout();
  return res.status(200).end();
}

module.exports.requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    next();
};





// function(email, password, done) {
//       User.findOne({email: email, password: password}, function(err, user) {
//         if (err) {
//           return done(new Error("No user found with those credentials"));
//         }
//         return done(null, user);
//       });
//     }));
