const express = require('express');
const app = express();
const auth = require('./auth');

app.use(express.json());
app.use('/auth', auth);

module.exports = app;
