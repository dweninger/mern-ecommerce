const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already registered' });
    }

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role: 'admin',
    });

    const savedUser = await _user.save();
    if (savedUser) {
      return res.status(201).json({ message: 'Admin created successfully' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      if (existingUser.authenticate(req.body.password) && existingUser.role === 'admin') {
        const token = jwt.sign({ _id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, {
          expiresIn: '1d',
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
      return res.status(400).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logged out successfully!'
  });
}
