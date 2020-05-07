const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const champRotation = require('./routes/champRotation');
const summonerMastery = require('./routes/summonerMastery');
const summonerHistory = require('./routes/summonerHistory');
const summonerInfo = require('./routes/summonerInfo');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', champRotation);
app.use('/mastery', summonerMastery);
app.use('/match-history', summonerHistory);
app.use('/summoner', summonerInfo);

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
