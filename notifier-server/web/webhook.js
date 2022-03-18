const express = require('express');
const bodyParser = require('body-parser');
const repo = require('../lib/repo');

/**
 * Receives any text posted to it, saves it to our database as the text attribute of a message, and returns an affirmative
 * response
 */
const webhookRoute = (req, res) => {
    const message = {
        text: req.body,
    };
    repo
        .create(message)
        .then(record => {
            res.end('Saved' + JSON.stringify(record));
        })
        .catch(e => {
            console.error(e);
            res.status(500);
            res.end(e.message);
        });
};

const router = express.Router();
router.post('/', bodyParser.text({ type: '*/*' }), webhookRoute);

module.exports = router;