const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'index',
        extname: '.hbs'
    }));

    app.use(bodyParser.urlencoded({extended: true}));

    app.set('view engine', '.hbs');
};