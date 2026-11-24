let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let OrderSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: "VisitorSession", required: true },    // permite ao visitante consultar as encomendas da sua sessão
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        
        // name e unitPrice são copiados no momento da compra, para mudanças de preço não alterarem encomendas antigas
        name: { type: String, required: true },
        unitPrice: { type: Number, min: 0 },
        quantity: {        // inteiro maior ou igual a 1
            type: Number,
            required: true,
        },
    }],
    total: { type: Number, required: true, min: 0 },    // calculado no frontend com os preços
    paid: { type: Boolean, default: false },    // pagamento simulado
    status: { type: String, enum: ["confirmed", "ready", "delivered"], default: "confirmed" },    // o gestor atualiza o estado

});

let Order = mongoose.model("Order", OrderSchema);

module.exports = Order;