const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// Conectar ao banco
mongoose.connect('mongodb+srv://balta:balta@cluster0-niiny.mongodb.net/baltaio?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Carregando modelos
const Product = require('./models/Product');

// Carregar as Rotas
const indexRoute = require('../src/routes');
const productRoute = require('./routes/ProductRoute');

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;