const WebSocketServer = require('websocket').server;
const queue = require('../lib/queue');

const configureWebSockets = httpServer => {
    const wsServer = new WebSocketServer({ httpServer });

    let connection;

    wsServer.on('request', function(request) {
        connection = request.accept(null, request.origin);
        console.log('Accepted connection...');

        connection.on('close', function() {
            console.log('Closing connection...');
            connection = null;
        });

        queue
            .receive('socket', message => {
                if (!connection) {
                    console.log('No WebSocket connection');
                    return;
                }
                connection.sendUTF(JSON.stringify(message));
            })
            .catch(console.error);
    });
};

module.exports = configureWebSockets;