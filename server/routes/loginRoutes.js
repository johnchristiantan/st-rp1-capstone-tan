const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// LOGIN a user
router.post('/login', userController.loginUser);

module.exports = router;