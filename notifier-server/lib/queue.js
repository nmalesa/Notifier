const amqp = require('amqplib');

const queueUrl = 'amqp://localhost';

/**
 * Connects to the queue and creates a channel for communication
 * @private
 */
const channel = () => {
    return amqp.connect(queueUrl).then(connection => connection.createChannel());
};

/**
 * Allows us to send a message on a given queue
 * @param { string } queue - Identifies which queue to send the message
 * @param { object } message - { text: string }
 */
const send = (queue, message) =>
    channel().then(channel => {
        const encodedMessage = JSON.stringify(message);
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(encodedMessage));
        console.log('Sent to "%s" message %s', queue, encodedMessage);
    });

/**
 * Allows us to listen for messages on a given queue, calling in a passed-in handler when a message arrives
 * @param { string } queue - Identifies which queue has received the message
 * @param { function } handler - Saves incoming data to database
 */
const receive = (queue, handler) =>
    channel().then(channel => {
        channel.assertQueue(queue, { durable: false });
        console.log('Listening for messages on queue "%s"', queue);
        channel.consume(queue, msg => handler(JSON.parse(msg.content.toString()))), {
            noAck: true,
        };
    });

module.exports = { send, receive }