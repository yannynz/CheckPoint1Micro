const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
});

module.exports = mongoose.model('Produto', ProdutoSchema);

