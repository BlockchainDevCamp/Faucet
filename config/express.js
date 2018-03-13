const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
var express = require('express');
// var app = express();

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'index',
        extname: '.hbs'
    }));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('.'));

    app.set('view engine', '.hbs');
};