import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema({
    nomeCategoria:{type: String, required: true},
    nomeEstabelecimento:{type: String, required: true},
    valor:{type: Number, required: true}
});

const gastos = mongoose.model("gastos", gastoSchema);

export default gastos;