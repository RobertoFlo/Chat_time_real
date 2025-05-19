const Message = require('../models/Message');

// @desc    Get all messages
// @route   GET /api/chat/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.query.room || 'general' })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('sender', 'username')
      .exec();

    res.json(messages.reverse());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMessages };