let mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
let Schema = mongoose.Schema;

let MuseumSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    hourAvailable: { type: String, required: true },
    image: { type: String, required: true },
    contacts: {
        email: { type: String, required: true },
        phone: { type: Number, required: true },
    },
});

let Museum = mongoose.model("Museum", MuseumSchema);

module.exports = Museum;