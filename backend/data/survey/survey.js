const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'VisitorSession', required: true, unique: true },
  overallRating: { type: Number, required: true },
  clarityRating: { type: Number, required: true },
  comment: String
});

module.exports = mongoose.model('Survey', surveySchema);