'use strict';
const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/CustomerRepository');
const md5 = require('md5');

const mailService = require('../services/MailService');

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
    const { name, email, password } = req.body;

    const contract = new ValidationContract();
    contract.hasMinLen(name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(email, 'O e-mail não é válido');
    contract.hasMinLen(password, 3, 'A senha deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const data = await repository.create({
            name,
            email,
            password: md5(password + global.SALT_KEY)
        });

        mailService.send(
            email, 
            'Bem vindo ao Node Store', 
            global.EMAIL_TMPL.replace('{0}', name)
        );

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