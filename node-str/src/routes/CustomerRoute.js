'use strict'

const express = require('express');
const controller = require('../controllers/CustomerController');
const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.store);

module.exports = router;