const express = require('express');
const {handleRegister, handleLogin, handleLogout, handleAutoLogin} = require("../controllers/authController");

const router = express.Router();

// /api/auth/
router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.post('/autologin', handleAutoLogin)
router.post('/logout', handleLogout)

module.exports = router;