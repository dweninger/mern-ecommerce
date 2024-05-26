const express = require('express');
const router = express.Router();
const { createAddress, removeAddress, getUserAddresses } = require('../controllers/user');
const { requireSignin } = require('../common-middleware');

router.post('/user/addaddress', requireSignin, createAddress);
router.post('/user/deleteaddress', requireSignin, removeAddress);
router.get('/user/getaddresses', requireSignin, getUserAddresses);

module.exports = router;
