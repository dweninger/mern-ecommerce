const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    const savedUser = await _user.save();
    if (savedUser) {
      return res.status(200).json({ message: 'User created successfully' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      if (existingUser.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        const { firstName, lastName, email, role, fullName } = existingUser;
        res.status(200).json({
          token,
          user: {
            _id: existingUser._id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: 'Invalid password',
        });
      }
    } else {
      return res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
