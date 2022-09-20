const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser');
var serveStatic  = require('serve-static');

const app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const publicDirectory = path.join(__dirname, './assets');
app.use(serveStatic(publicDirectory));

var indexRouter = require('./routes/index-route');
var weatherRouter  = require('./routes/weather-route');
app.use('/', indexRouter);
app.use('/', weatherRouter);