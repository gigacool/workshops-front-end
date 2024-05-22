const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
  let token = req.headers['authorization'];
  
  if (!token) {
    res.status(401).send('No token provided');
  }

  token = token.replace('Bearer ', '').trim();
  try {
    req.user = verifyToken(token);
    next();
  } 
  catch (err) {
    res.status(401).send('Invalid token, check your header<br/> Expect Authorization -> Bearer ${token}');
  }
};

module.exports = authMiddleware;
