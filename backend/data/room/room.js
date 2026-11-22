let mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
let Schema = mongoose.Schema;

let RoomSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, required: false },
});

let Room = mongoose.model("Room", RoomSchema);

module.exports = Room;