const User = require('../models/User');
const bcrypt = require('bcrypt');

// Validate user input for login
exports.validateLoginInput = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  next();
};

// Validate user input for registration
exports.validateRegisterInput = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  next();
};

// Validate user existence
exports.validateUserExistence = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
