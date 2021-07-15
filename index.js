const express = require('express')
const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.listen(2121, () => {
        console.log('Server Started! 🚀')
    })
}

module.exports = app;