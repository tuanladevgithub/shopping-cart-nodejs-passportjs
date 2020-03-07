const express = require('express');
const router = express.Router();

/* GET product index page */
router.get('/', function (req, res, next) {
    res.render('shop/index', {});
});

module.exports = router;