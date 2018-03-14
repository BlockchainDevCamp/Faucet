"use strict"
const controllers = require('../controllers');

module.exports = app => {
    app.get('/', controllers.faucetController.main);
    app.get('/success', controllers.faucetController.success);
    app.get('/too-soon', controllers.faucetController.tooSoon);
    app.get('/out-of-money', controllers.faucetController.outOfHoney);
    app.post('/faucet', controllers.faucetController.postTransaction);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};