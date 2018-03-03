'use strict';

const controllers = require('../controllers');

module.exports = app => {
    app.post('/:address/transactions', [
        controllers.transactionResource.validateTransactionData,
        controllers.transactionResource.createTransaction
    ]);

    app.all('*', (req, res) => {

        res.status(404);
    res.send('404 Not Found');
    res.end();
});
};