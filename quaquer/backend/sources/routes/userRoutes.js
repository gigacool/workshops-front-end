const express = require('express');
const { getUserProfile, getAuthentifiedProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile/:userId', authMiddleware, getUserProfile);
router.get('/profile/', authMiddleware, getAuthentifiedProfile);

module.exports = router;
