let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PointOfInterestSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },    // sala a que pertence (obrigatória)
    published: { type: Boolean, default: false },    // rascunho (false) ou publicado (true); o visitante só vê os publicados
    documents: [{ name: String, url: String }],    // PDFs anexados
    videos: [String],
    gallery: [String],

});

let PointOfInterest = mongoose.model("PointOfInterest", PointOfInterestSchema);

module.exports = PointOfInterest;