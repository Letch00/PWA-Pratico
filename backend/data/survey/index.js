const Survey = require('./survey');
const SurveyService = require('./service');

const service = SurveyService(Survey);

module.exports = service;