const express = require('express');
const app = express();
const auth = require('./auth');
const blogpost = require('./blogpost');

app.use(express.json());
app.use('/auth', auth);
app.use('/blogpost', blogpost);

module.exports = app;
