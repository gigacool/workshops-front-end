const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const generateToken = (user) => {
  let token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { generateToken, verifyToken };
