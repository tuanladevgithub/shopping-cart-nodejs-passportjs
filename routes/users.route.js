const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* view profile */
router.get('/profile', function (req, res, next) {
  res.render('user/profile')
});

/* Logout user */
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
