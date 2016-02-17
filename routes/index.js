var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');

router.post('/login', function(req,res,next) {
  // NOTE: use the custom version of authenticate so that we can
  // react to the authentication result... and so that we can
  // propagate an error back to the frontend without using flash
  // messages
  passport.authenticate('local', function(err,user) {
    if(user) {
      // NOTE: using this version of authenticate requires us to
      // call login manually
      req.logIn(user, function(err) {
       res.json(req.user);
      });
    } else {
         res.sendStatus(401);
    }
  })(req, res, next);
  // NOTE: notice that this form of authenticate returns a function that
  // we call immediately! See custom callback section of docs:
  // http://passportjs.org/guide/authenticate/
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send message back to registration...
      res.sendStatus(401);
      //res.render('register',{message:'Your username or password is already taken'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      passport.authenticate('local')(req, res, function() {
        res.json(req.user);
      });
    }
  });  
});

router.get('/loggedin', function(req, res) { 
  res.send(req.user != undefined ? req.user : '0');  //check if a user has loggedin
}); 

router.get('/auth/logout', function(req, res){
  req.logout();
  res.send(200);
});

module.exports = router;