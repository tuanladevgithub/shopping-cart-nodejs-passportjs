const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

let csrfProtection = csrf();

router.use(csrfProtection);


/* Sign-up index */
router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');

    res.render('auth/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasError: messages.length > 0
    });
});
/* Process sign up */
router.post('/signup', passport.authenticate('local.signup', { successRedirect: '/users/profile', failureRedirect: '/auth/signup', failureFlash: true }));



/* Sign-in index */
router.get('/signin', function (req, res, next) {
    let messages = req.flash('error');

    res.render('auth/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasError: messages.length > 0
    });
});
/* Process sign-in */
router.post('/signin', passport.authenticate('local.signin', { successRedirect: '/users/profile', failureRedirect: '/auth/signin', failureFlash: true }));

module.exports = router;