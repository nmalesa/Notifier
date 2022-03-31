if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const http = require('http');
const express = require('express');
const cors = require('cors');
const webhookRouter = require('./webhooks');
const listRouter = require('./list');
const configureWebSockets = require('./socket');

const app = express();

app.use(cors);
app.use('/webhooks', webhookRouter);
app.use('/list', listRouter);

const uri = 'mongodb://localhost:27017/notifier';

const server = http.createServer(app);
configureWebSockets(server);

const { PORT = 3000 } = process.env;
server.listen(PORT);
console.log(`Listening on port ${PORT}...`);