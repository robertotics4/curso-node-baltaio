'use strict';
const repository = require('../repositories/OrderRepository');
const guid = require('guid');

exports.index = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};

exports.store = async (req, res, next) => {
    try {
        const data = {
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        }

        await repository.create(data);
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso.',
            data
        });
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};