const queue = require('../lib/queue');
const repo = require('../lib/repo');

/**
 * Receives a message on the incoming queue, saves the record to the database, and sends another message out on the socket
 * queue
 * @param { object } message - { text: string }
 */
const handleIncoming = message =>
    repo
        .create(message)
        .then(record => {
            console.log('Saved' + JSON.stringify(message));
            return queue.send('socket', record);
        });

    queue
        .receive('incoming', handleIncoming)
        .catch(console.error);