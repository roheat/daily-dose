const fs = require("fs");
const http = require("http");
const path = require("path");
const methods = require("methods");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const errorhandler = require("errorhandler");
const mongoose = require("mongoose");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(cors());

// log requests
app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "daily-dose",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorhandler());
}

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(process.env.DATABASE);
  mongoose.set("debug", true);
}

// models
require("./models/User");
require("./models/Article");

// config
require("./config/passport");

app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// start the server
const server = app.listen(process.env.PORT || 7777, function() {
  console.log("Listening on port " + server.address().port);
});
