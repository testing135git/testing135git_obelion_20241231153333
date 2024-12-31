const User = require('../models/User');

const bcrypt = require('bcrypt');

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.authenticate(username, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Register new user
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Other methods like password recovery, etc. can be added similarly
