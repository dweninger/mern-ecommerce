const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth');
const { validateRegisterRequest, validateLoginRequest, isRequestValidated } = require('../validators/auth');

router.post('/login', validateLoginRequest, isRequestValidated, login);
router.post('/register', validateRegisterRequest, isRequestValidated, register);
router.post('/logout', logout);

// router.post('/profile', requireSignin, (req, res) => {
//   res.status(200).json({user: 'profile'});
// });

module.exports = router;
