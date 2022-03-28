const express = require('express');
const bodyParser = require('body-parser');
const queue = require('../../lib/queue');

/**
 * Enqueues data and confirms that we have received it
 */
const webhookRoute = (req, res) => {
    const message = {
        text: req.body,
    };
    queue
        .send('incoming', message)
        .then(() => {
            res.end('Received ' + JSON.stringify(message));
        })
        .catch(e => {
            console.error(e);
            res.status(500);
            res.end(e.message);
        });
};

module.exports = webhookRoute;