const queue = require('../lib/queue');
const repo = require('../lib/repo');

/**
 * Listens for incoming data and saves it to database
 * @param { object } message - { text: string }
 */
const handleIncoming = message =>
    repo
        .create(message)
        .then(record => {
            console.log('Saved' + JSON.stringify(message));
        });

    queue
        .receive('incoming', handleIncoming)
        .catch(console.error);