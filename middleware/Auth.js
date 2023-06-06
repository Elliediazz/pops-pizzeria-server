const jwt = require('jsonwebtoken');

if (process.env.ENV !== 'production') {
  require('dotenv').config();
}

function validateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  //console.log(authHeader)
  if (!authHeader) {
    return res.status(401).send("Not authenticated");
  }

  const token = authHeader.split(' ')[1];
  //console.log("TOKEN:",token)
  if (!token) {
    return res.status(401).send("Not authenticated");
  }

  try {
    const jwtSecretKey = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        } else {
          return res.status(500).json({ error: 'Token validation error', err });
        }
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  validateJWT,
};