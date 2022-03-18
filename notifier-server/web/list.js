const express = require('express');
const repo = require('../lib/repo');

/**
 * Provides a way to read messages in the database
 */
const listRoute = (req, res) => {
    repo
        .list()
        .then(messages => {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(messages));
        })
        .catch(e => {
            console.error(e);
            res.status(500);
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
        });
};

const router = express.Router();
router.get('/', listRoute);

module.exports = router;