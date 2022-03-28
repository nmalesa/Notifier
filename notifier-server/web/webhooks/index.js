const express = require('express');
const bodyParser = require('body-parser');
const testRoute = require('./test');
const githubRoute = require('./github');

const router = express.Router();
router.post('/test', bodyParser.text({ type: '*/*' }), testRoute);
router.post('/github', express.json(), githubRoute);

module.exports = router;