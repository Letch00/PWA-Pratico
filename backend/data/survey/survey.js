const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'VisitorSession', required: true, unique: true },
  overallRating: { type: Number, required: true },    // classificação global de 1 a 5
  comment: { type: String },
});

module.exports = mongoose.model('Survey', surveySchema);