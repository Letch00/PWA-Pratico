let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RouteSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    estimatedMinutes: { type: Number, default: 0 },
    points: [{ type: Schema.Types.ObjectId, ref: "PointOfInterest" }],
    published: { type: Boolean, default: false },
    custom: { type: Boolean, default: false },    // true se for um percurso personalizado criado por um visitante (extra)
    session: { type: Schema.Types.ObjectId, ref: "VisitorSession" },    // sessão que criou o percurso personalizado
});

let Route = mongoose.model("Route", RouteSchema);

module.exports = Route;