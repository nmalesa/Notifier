const express = require('express');
const bodyParser = require('body-parser');
const testRoute = require('./test');

const router = express.Router();
router.post('/test', bodyParser.text({ type: '*/*' }), testRoute);

module.exports = router;