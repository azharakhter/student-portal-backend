// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { generateMessages } = require('../generate-message');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Error verifying token:', err.message);
        throw generateMessages('INVALID_TOKEN');
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    throw generateMessages('INVALID_TOKEN');
  }
};

module.exports = authenticateJWT;
