const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error);

const messageSchema = new mongoose.Schema({
    text: String,
    url: String,
});

const Message = mongoose.model('Message', messageSchema)

/**
 * Saves a new message record with the attributes we pass it
 * @param { object } attrs - Message attributes include text and url
 */
const create = attrs => new Message(attrs).save();

/**
 * Returns all the message records in the database in the reverse order they were created
 */
const list = () => Message.find().then(messages => messages.slice().reverse());

module.exports = { create, list };