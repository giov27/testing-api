var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/HospitalDatabase', {useNewUrlParser: true})
.then(()=>console.log('MongoDb Connect')).catch(err=>console.log(err))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visitorDetailRouter = require('./routes/visitorDetail');
var queueNumberRouter = require('./routes/queueNumber');

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const http = require('http');

// const hostname = '127.0.0.1';
const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visitorDetail', visitorDetailRouter);
app.use('/queueNumber', queueNumberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
