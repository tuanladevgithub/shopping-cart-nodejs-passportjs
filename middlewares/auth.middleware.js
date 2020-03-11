module.exports.requireAuthenticate = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
    }
    next();
}

module.exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    next();
}