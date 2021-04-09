'use strict';

const path = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const cors = require('cors');

const baseRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const taskownerRouter = require('./routes/taskowner');
const individualRouter = require('./routes/individual');

const app = express();

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    origin: (process.env.ALLOWED_CORS_ORIGINS || '').split(','),
    credentials: true
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none', // Can be used cross-site
      secure: true
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/individual', individualRouter);
app.use('/taskowner', taskownerRouter);
app.use('/individual', individualRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
