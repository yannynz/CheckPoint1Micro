//server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/produtoDB')
    .then(() => console.log('MongoDB Conectado'))
    .catch(err => console.log(err));

//index.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const Produto = require('./produto.js');

// POST - Criar Produto
app.post('/produtos/create', async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json({
            produto,
            message: 'Produto criado com sucesso'
        }); 
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar produto' });
    }
});

// GET - Listar Todos os Produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
});

// PUT - Atualizar Produto
app.put('/produtos/update/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json(produto);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao atualizar produto' });
    }
});

// DELETE - Deletar Produto
app.delete('/produtos/delete/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar produto' });
    }
});

