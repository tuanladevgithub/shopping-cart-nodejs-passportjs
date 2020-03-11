const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);


const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const shopRouter = require('./routes/products.route');

const authMiddleware = require('./middlewares/auth.middleware');


const app = express();

// connect to mongodb
mongoose.connect('mongodb://admin:Fart_20011998@localhost:27017/shopping-cart?authSource=admin&readPreference=primary&ssl=false');
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(validator());
app.use(cookieParser());
app.use(session({ 
  secret: '1837kskfhidfdfdsqk123klows', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 60    // = 1h
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.isSignin = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authMiddleware.isLoggedIn, authRouter);
app.use('/users', authMiddleware.requireAuthenticate, usersRouter);
app.use('/products', shopRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
