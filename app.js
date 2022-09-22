const express = require('express');
const path = require('path');
const morgan = require('morgan');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const publicDirectory = path.join(__dirname, './client/assets');
app.use(express.static(publicDirectory));

var indexRouter = require('./routes/index-route');
var weatherRouter  = require('./routes/weather-route');
var placeRouter = require('./routes/place-route');
app.use('/', indexRouter);
app.use('/', weatherRouter);
app.use('/', placeRouter);

module.exports = app;