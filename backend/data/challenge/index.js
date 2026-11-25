const Challenge = require('./message');
const ChallengeSchema = require('./service');

const service = ChallengeSchema(Challenge);

module.exports = service;