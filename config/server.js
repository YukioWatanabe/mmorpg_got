const express = require('express');
const validator = require('express-validator');
const session = require('express-session');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('./src/public'));
app.use(bodyParser.urlencoded( { extended : true }));
app.use(validator());

app.use(session({
    secret: 'sada21312WWSQ!@3',
    resave: false,
    saveUninitialized: false
}));

consign().include('config/DbConnection.js')
         .then('src/controllers')
         .then('src/routes')
         .then('src/models')
         .into(app);

module.exports = app;