'use strict';
const mongoose = require('mongoose');

const Product = mongoose.model('Product');

exports.index = (req, res, next) => {
    Product.find({
        active: true,
    }, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao obter os produtos.',
                error: e.message
            });
        });
};

exports.findBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true,
    }, '-__v')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao obter o produto.',
                error: e.message
            });
        });
};

exports.findById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao obter o produto.',
                error: e.message
            });
        });
};

exports.findByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao obter os produtos.',
                error: e.message
            });
        });;
};

exports.store = (req, res, next) => {
    const product = new Product(req.body);

    product.save().then(data => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso.',
            data
        });
    })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto.',
                error: e.message
            });
        });
};

exports.update = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            tags: req.body.tags,
            slug: req.body.slug
        }
    })
        .then(data => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso.',
                data
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto.',
                error: e.message
            });
        });
};

exports.destroy = (req, res, next) => {
    Product.findOneAndRemove(req.params.id)
        .then(data => {
            res.status(201).send({
                message: 'Produto removido com sucesso.',
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto.',
                error: e.message
            });
        });
};