const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

if (process.env.ENV !== 'production') {
  require('dotenv').config();
}

// MongoDB connection
const url = process.env.MONGO_URI;
const dbName = 'PopsPizzeria';

const client = new MongoClient(url);

async function validateJWT(req, res, next) {
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
    jwt.verify(token, jwtSecretKey, async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Token validation error', err });
      }

      // If token is not expired, check if it exists in blacklist collection
      const collection = client.db(dbName).collection('blacklist');
      const blacklistedToken = await collection.findOne({ token });

      if (blacklistedToken) {
        return res.status(401).json({ error: 'Token blacklisted. NOT TODAY' });
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