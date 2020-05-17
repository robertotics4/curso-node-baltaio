'use strict'
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    return await Order
    .find({}, 'number status customer items')
    .populate('customer', 'name')
    .populate('items.product', 'slug');
};

exports.create = async data => {
    const order = new Order(data);

    return await order.save();
};