const Route = require('./survey');
const RouteService = require('./service');

const service = RouteService(Route);

module.exports = service;