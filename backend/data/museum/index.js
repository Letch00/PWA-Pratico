const Users = require('./museum');
const UsersService = require('./service');

const service = UsersService(Users);

module.exports = service;