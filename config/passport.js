const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

//authenticate local-signup:
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        // validator request param:
        // req.checkBody('email', 'Invalid email.').notEmpty().isEmail();
        // req.checkBody('password', 'invalid password.').notEmpty().isLength({min: 6});
        // let errors = req.validationErrors();
        // if (errors) {
        //     let messages = [];
        //     errors.forEach(error => {
        //         messages.push(error.msg);
        //     });
        //     return done(null, false, req.flash('error', messages));
        // }
        User.findOne({ 'email': email }, async function (err, user) {
            // in case of any error when find user:
            if (err) {
                return done(err);
            }
            // if user already exists:
            if (user) {
                return done(null, false, { message: 'Email is already in use.' });
            } else {
                // if these is no user with that email:
                //create new user:
                var newUser = new User();
                newUser.name = req.body.name;
                newUser.email = email;
                try {
                    newUser.password = await bcrypt.hash(password, 10); // hash password with bcrypt
                    //save new user:
                    var result = await newUser.save();
                    return done(null, result);
                } catch (error) {
                    return done(error);
                }
            }
        });
    }
));

//authenticate local-signin
passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        User.findOne({ email: email }, async function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            try {
                var checkPassword = await user.validPassword.bind(user)(password);
                if (!checkPassword) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
