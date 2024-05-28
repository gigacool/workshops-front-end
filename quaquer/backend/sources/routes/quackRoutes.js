const express = require('express');
const router = express.Router();
const quackController = require('../controllers/quackController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new quack
router.post('/', authMiddleware, quackController.createquack);

// Like a quack
router.post('/:quackId/like', authMiddleware, quackController.likeQuack);

// Get all quacks
router.get('/', quackController.getAllquacks);

// Get quacks by a specific user
router.get('/user/:userId', quackController.getUserquacks);

// Delete a quack
router.delete('/:quackId', authMiddleware, quackController.deletequack);

module.exports = router;
