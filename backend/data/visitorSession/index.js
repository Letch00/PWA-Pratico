const VisitorSessions = require('./visitorSession');
const VisitorSessionsService = require('./service');

const service = VisitorSessionsService(VisitorSessions);

module.exports = service;