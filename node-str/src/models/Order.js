'use strict';

const mongoosse = require('mongoose');
const Schema = mongoosse.Schema;

const orderSchema = new Schema({
    customer: {
        type: mongoosse.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        product: {
            type: mongoosse.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
});

module.exports = mongoosse.model('Order', orderSchema);
