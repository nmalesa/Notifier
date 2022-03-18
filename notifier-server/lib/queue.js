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
 * @param { string } queue -
 * @param { object } message -
 */
const send = (queue, message) => {
    console.log("Queue from send: ", queue);
    console.log("Message from send: ", message);
    channel().then(channel => {
        const encodedMessage = JSON.stringify(message);
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(encodedMessage));
        console.log('Sent to "%s" message %s', queue, encodedMessage);
    });
};

/**
 * Allows us to listen for messages on a given queue, calling in a passed-in handler when a message arrives
 * @param { string } queue -
 * @param { object } handler -
 */
const receive = (queue, handler) => {
    console.log("Queue from receive: ", queue);
    console.log("Handler from receive: ", handler);
    channel().then(channel => {
        channel.assertQueue(queue, { durable: false });
        console.log('Listening for messages on queue "%s"', queue);
        channel.consume(queue, msg => handler(JSON.parse(msg.content.toString()))), {
            noAck: true,
        };
    });
};

module.exports = { send, receive }