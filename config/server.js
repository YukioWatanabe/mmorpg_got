const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('./src/public'));
app.use(bodyParser.urlencoded( { extended : true }));
app.use(validator());

consign().include('config/DbConnection.js')
         .then('src/controllers')
         .then('src/routes')
         .then('src/models')
         .into(app);

module.exports = app;