const PointsOfInterest = require('./pointOfInterest');
const PointsOfInterestService = require('./service');

const service = PointsOfInterestService(PointsOfInterest);

module.exports = service;