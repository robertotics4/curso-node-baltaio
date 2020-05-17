'use strict'
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    return await Product.find({
        active: true,
    }, 'title price slug');
};

exports.getBySlug = async slug => {
    return await Product
        .findOne({
            slug,
            active: true,
        }, '-__v');
};

exports.getById = async id => {
    return await Product.findById(id);
};

exports.getByTag = async tag => {
    return await Product
        .find({
            tags: tag,
            active: true
        });
};

exports.create = async data => {
    const product = new Product(data);

    return await product.save();
};

exports.update = async (id, data) => {
    return await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                tags: data.tags,
                slug: data.slug
            }
        });
};

exports.delete = async id => {
    return await Product.findOneAndRemove(id);
};