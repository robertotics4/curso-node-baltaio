'use strict';

const mongoosse = require('mongoose');
const Schema = mongoosse.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoosse.model('Customer', customerSchema);
