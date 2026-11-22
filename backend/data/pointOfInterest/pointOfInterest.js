const mongoose = require('mongoose');

const pointOfInterestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  image: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  published: { type: Boolean, default: false },
  documents: [{ name: String, url: String }],
  videos: [String],
  gallery: [String],
  template: { type: String, default: 'featured' },
  sections: [{ name: String, active: Boolean }]
}, { timestamps: true });

module.exports = mongoose.model('PointOfInterest', pointOfInterestSchema);