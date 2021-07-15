require('dotenv').config();
const jwt = require('jsonwebtoken');
const logging = require('../utilities/logging');

const options = {
  algorithm: process.env.ALGORITHM,
  issuer: process.env.ISSUER,
  expiresIn: process.env.LOGIN_EXP_TIME,
};

function signJWT(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, options);
}

function verifyJWT(token) {
  return jwt.verify(
    token,
    process.env.SECRET_KEY,
    options,
    function (err, decoded) {
      if (err) {
        logging.error('JWT:', err);
        return false;
      }
      return decoded;
    }
  );
}

module.exports = { signJWT, verifyJWT };
