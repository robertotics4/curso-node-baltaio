'use strict';
const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/ProductRepository');

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

exports.findBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};

exports.findById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: e.message
        });
    }
};

exports.findByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};

exports.store = async (req, res, next) => {
    const contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const data = await repository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso.',
            data
        });
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        const data = await repository.update(req.params.id, req.body);
        res.status(201).send({
            message: 'Produto atualizado com sucesso.',
            data
        });
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};

exports.destroy = async (req, res, next) => {
    try {
        const data = await repository.delete(req.params.id);
        res.status(201).send({
            message: 'Produto removido com sucesso.',
            data
        });
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};