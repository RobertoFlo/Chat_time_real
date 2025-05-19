const Message = require('../models/Message');
const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

const configureSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }
      
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }
      
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.username}`);
    
    // Join a room
    socket.on('joinRoom', (data) => {
      const { room } = data;
      socket.join(room);
    });
    
    // Leave a room
    socket.on('leaveRoom', ({ room }) => {
      socket.leave(room);
      console.log(`${socket.user.username} left room: ${room}`);
    });
    
    // Handle new messages
    socket.on('sendMessage', async ({ content, room }) => {
      try {
        const message = new Message({
          content,
          sender: socket.user._id,
          room: room || 'general',
        });
        
        await message.save();
        
        const populatedMessage = await Message.populate(message, {
          path: 'sender',
          select: 'username',
        });
        
        io.to(room || 'general').emit('newMessage', populatedMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.username}`);
    });
  });
};

module.exports = configureSocket;