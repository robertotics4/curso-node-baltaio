'use strict'

const express = require('express');
const controller = require('../controllers/ProductController');
const router = express.Router();

router.get('/', controller.index);
router.get('/:slug', controller.findBySlug);
router.get('/admin/:id', controller.findById);
router.get('/tags/:tag', controller.findByTag);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;