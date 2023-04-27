const express = require('express');
const { sendEmail, verifyOTP,passwordReset } = require('../controller/SendMail');
const jwtAuthenticate = require('../middleware/auth');
const router = new express.Router();

// const jwtAuthenticate = require('../middleware/auth');

//sendMail Endpoint
router.post('/api/v1/send_email',jwtAuthenticate, sendEmail);
// verify otp
router.get('/api/v1/verify_otp/:otp',jwtAuthenticate, verifyOTP);

//password reset
router.post('/api/v1/password_reset',jwtAuthenticate, passwordReset);


module.exports = router;
