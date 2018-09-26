const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lockerRouter = require('./routes/locker');
const notificationRouter = require('./routes/notification');

const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const dote = require('dotenv').config();
// mongoose.connect('mongodb://admin:abc123@ds259742.mlab.com:59742/final-project');


var MONGO_URI = `mongodb://admin:abc123@ds259742.mlab.com:59742/final-project`
var test = `mongodb://mario:mario123@ds259912.mlab.com:59912/finalproject-testingserver`

if(process.env.NODE_ENV == 'test'){
  MONGO_URI = test
}
mongoose.connect(test,{useNewUrlParser: true}, function(err){
  if(err){
    console.log(err)
  }else{
    console.log('connected')
  }
})


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//  console.log('connected to final project');
//  // we're connected!
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/locker', lockerRouter);
app.use('/notification', notificationRouter);

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
