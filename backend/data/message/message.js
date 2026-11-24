let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: "VisitorSession", required: true }, // a conversa pertence à sessão do visitante
    author: { type: String, enum: ["visitor", "staff"], required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" }, // membro da equipa que respondeu (só quando author é "staff")
    text: { type: String, required: true },
    read: { type: Boolean, default: false }, // para saber o que ainda não foi lido

});

let Message = mongoose.model("Message", MessageSchema);

module.exports = Message;