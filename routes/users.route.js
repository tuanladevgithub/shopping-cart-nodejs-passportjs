const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');


let csrfProtection = csrf();

router.use(csrfProtection);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Sign-up index */
router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');

  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasError: messages.length > 0    
  });
});
/* Process sign up */
router.post('/signup', passport.authenticate('signup', { successRedirect: '/users/profile', failureRedirect: '/users/signup', failureFlash: true }));



/* Sign-in index */
router.get('/signin', function (req, res, next) {
  let messages = req.flash('error');

  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasError: messages.length > 0
  });
});
/* Process sign-in */
router.post('/signin', passport.authenticate('signin', { successRedirect: '/users/profile', failureRedirect: '/users/signin', failureFlash: true}));



/* view profile */
router.get('/profile', function (req, res, next) {
  res.render('user/profile')
});

module.exports = router;
