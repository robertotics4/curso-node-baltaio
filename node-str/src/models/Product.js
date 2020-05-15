'use strict';

const mongoosse = require('mongoose');
const Schema = mongoosse.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required:true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]
});

module.exports = mongoosse.model('Product', productSchema);
