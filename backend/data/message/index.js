const Message = require('./message');
const MessageSchema = require('./service');

const service = MessageSchema(Message);

module.exports = service;