const app = require('./app');
const http = require('http');
const socketio = require('socket.io');
const configureSocket = require('./services/socketService');

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
  },
});

// Configuracion Socket.IO
configureSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server en el puerto ${PORT}`);
});