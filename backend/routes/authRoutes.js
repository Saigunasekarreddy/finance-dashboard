// const express = require('express');
// const { register, login, getCurrentUser } = require('../controllers/authController');
// const verifyToken = require('../middleware/verifyToken'); // Path to your JWT verification middleware

// const router = express.Router();

// // Register route - to create a new user
// router.post('/register', register);

// // Login route - to authenticate the user and return a JWT token
// router.post('/login', login);

// // Protected route - to get the current logged-in user (requires token)
// router.get('/me', verifyToken, getCurrentUser);

// module.exports = router;
const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken'); // Path to your JWT verification middleware

const router = express.Router();

// Register route - to create a new user
router.post('/register', register);

// Login route - to authenticate the user and return a JWT token
router.post('/login', login);

// Protected route - to get the current logged-in user (requires token)
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
