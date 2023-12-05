const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../../controllers/admin/auth');
const { validateRegisterRequest, validateLoginRequest, isRequestValidated } = require('../../validators/auth');
const { requireSignin } = require('../../common-middleware');

router.post('/admin/login', validateLoginRequest, isRequestValidated, login);
router.post('/admin/register', validateRegisterRequest, isRequestValidated, register);
router.post('/admin/logout', logout)

module.exports = router;
