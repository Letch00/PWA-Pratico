const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true },
        description: { type: String, trim: true, default: '' },
        estimatedMinutes: { type: Number, min: 0, default: 0 },

        points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PointOfInterest' }],
        published: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Route', routeSchema);