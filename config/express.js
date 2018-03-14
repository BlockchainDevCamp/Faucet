const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'index',
        extname: '.hbs'
    }));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('.'));

    app.set('view engine', '.hbs');
};