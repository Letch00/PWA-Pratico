let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, },
    published: { type: Boolean, default: false },    // só os publicados aparecem na loja

});

let Product = mongoose.model("Product", ProductSchema);

module.exports = Product;