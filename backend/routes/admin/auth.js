const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/admin/auth');
const { validateRegisterRequest, validateLoginRequest, isRequestValidated } = require('../../validators/auth');

router.post('/admin/login', validateLoginRequest, isRequestValidated, login);
router.post('/admin/register', validateRegisterRequest, isRequestValidated, register);

module.exports = router;
