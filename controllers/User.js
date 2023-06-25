if (process.env.ENV !== 'production') {
  require('dotenv').config();
}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const validator = require('validator');

// MongoDB connection
const url = process.env.MONGO_URI;
const dbName = 'PopsPizzeria';
const collectionName = 'users';

const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB: Users');
  } catch (error) {
    console.error('Error connecting to MongoDB: Users', error);
  }
}

// Close the MongoDB connection
async function closeConnection() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB', error);
  }
}

// POST: SIGNUP a new user - public route
async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate sign-up form data
    const errors = {};

    if (validator.isEmpty(name)) {
      errors.name = 'Name is required';
    }

    if (!validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Password is required';
    } else if (!validator.isLength(password, { min: 8 })) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      errors.password = 'Password must contain at least one letter and one number';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const collection = client.db(dbName).collection(collectionName);

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const result = await collection.insertOne(newUser);

    const token = generateToken(newUser._id);

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.log(error);
  }
}

// POST: LOGIN user - public route
async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please add required fields');
    }

    const collection = client.db(dbName).collection(collectionName);

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = generateToken(user._id)

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        token: token
      });

    } else {
      res.status(401).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


// GET: user data - private route
async function getProfileData(req, res) {
  try {
    const user = req.user;

    res.json({
        user: {
          _id: user._id
        }
      });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// POST: LOGOUT user 
//TODO: have login and signup check the blacklisted tokens and deny access **************************************
async function logOut(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const collection = client.db(dbName).collection('blacklist');
    const result = await collection.insertOne({ token });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error Logging Out:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = {
  signUp,
  logIn,
  getProfileData,
  logOut,
  connect,
  closeConnection,
};