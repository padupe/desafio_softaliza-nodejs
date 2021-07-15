'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogSpotController');

router.get('/', controller.index);

router.post('/', controller.create);

router.get('/:slug', controller.show);

module.exports = router;
