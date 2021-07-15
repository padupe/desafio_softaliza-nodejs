const express = require('express');
// const routes = require('./routes');
const logging = require('./utilities/logging');
const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    logging.info('Server Started! 🚀');
    console.log('Server Started! 🚀');
  });
}

// app.use('/v1', routes);

module.exports = app;
