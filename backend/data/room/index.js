const Rooms = require('./museum');
const RoomsService = require('./service');

const service = RoomsService(Rooms);

module.exports = service;