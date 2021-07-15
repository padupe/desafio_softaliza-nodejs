const express = require('express');
const app = express();
const auth = require('./auth');
const blogspot = require('./blogspot');

app.use(express.json());
app.use('/auth', auth);
app.use('/blogspot', blogspot);

module.exports = app;
