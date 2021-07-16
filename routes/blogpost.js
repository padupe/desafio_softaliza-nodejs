'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogPostController');

router.post('/', controller.create);

router.get('/:slug', controller.show);

router.put('/:slug', controller.update);

router.delete('/:slug', controller.destroy);

module.exports = router;
