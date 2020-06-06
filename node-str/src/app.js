const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

app.use(express.json());

// Conectar ao banco
mongoose.connect(config.connectionString, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Carregando modelos
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Order = require( './models/Order');

// Carregar as Rotas
const indexRoute = require('../src/routes');
const productRoute = require('./routes/ProductRoute');
const customerRoute = require('./routes/CustomerRoute');
const orderRoute = require('./routes/OrderRoute');

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;