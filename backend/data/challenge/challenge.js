// DESAFIO. Pergunta de escolha múltipla associada a um ponto de interesse.
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ChallengeSchema = new Schema({
    // ponto a que pertence
    point: { type: Schema.Types.ObjectId, ref: "PointOfInterest", required: true },
    question: { type: String, required: true },
    // entre 2 e 4 opções
    options: {
        type: [String],
        validate: {
            validator: (v) => v.length >= 2 && v.length <= 4,
            message: "A challenge must have between 2 and 4 options",
        },
    },
    // índice da opção correta dentro de options; a API nunca o envia ao visitante antes de ele responder
    // (validar no service que é menor que options.length)
    correctAnswer: { type: Number, required: true, min: 0, max: 3 },
    // pontos que vale
    score: { type: Number, required: true, min: 1 },
    // o utilizador cria, os perfis superiores publicam
    published: { type: Boolean, default: false },
});

let Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;