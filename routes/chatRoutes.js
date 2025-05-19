const express = require('express');
const { getMessages } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/messages', authMiddleware, getMessages);

module.exports = router;