'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');

let pagesRouter = require('./pages/pagesRouter');
let boardRouter = require('./board/boardRouter');
let sharedRouter = require('./shared/sharedRouter');
let apiRouter = require('./api/apiRouter');

let app = express();


// connect to mongoose
mongoose.connect('mongodb://localhost/blacklist');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, ''));


app.use(compression());
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/pages', pagesRouter);
app.use('/board', boardRouter);
app.use('/api', apiRouter);
app.use('/', sharedRouter);
// app.use('/', coreRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || err.code || 500);
  return res.send('sorry, an error ocured');
});


module.exports = app;
