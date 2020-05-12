const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const { environment } = require("./config");
const champRotation = require('./routes/champRotation');
const regionControl = require('./routes/regionControl');
const summonerMastery = require('./routes/summonerMastery');
const summonerHistory = require('./routes/summonerHistory');
const summonerLeague = require('./routes/summonerLeague');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Middleware to set default region to NA1
app.use(function (req, res, next) {
  req.app.region = 'NA1';
  next();
});

app.use('/', champRotation); // Free champ rotation
app.use('/', regionControl); // Change region to make requests to
app.use('/mastery', summonerMastery); // Mastery points
app.use('/match-history', summonerHistory); // Match history of player
app.use('/league', summonerLeague) // Player rank


// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
