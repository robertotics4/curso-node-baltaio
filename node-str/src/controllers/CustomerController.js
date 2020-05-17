'use strict';
const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/CustomerRepository');

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
    const contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'O e-mail não é válido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const data = await repository.create(req.body);
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso.',
            data
        });
    } catch (e) {
        res.status(500).send({
            message: e.message
        });
    }
};