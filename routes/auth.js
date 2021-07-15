'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/', controller.logUser);

module.exports = router;
