const mongoose = require('mongoose');

const visitorSessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  visitedPoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PointOfInterest' }],
  badges: [{
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('VisitorSession', visitorSessionSchema);