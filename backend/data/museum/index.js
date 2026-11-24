const Museum = require('./museum');
const MusuemsSchema = require('./service');

const service = MusuemsSchema(Museum);

module.exports = service;