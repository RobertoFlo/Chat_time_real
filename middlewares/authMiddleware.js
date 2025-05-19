const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    
    // Verificar si el token está en los encabezados
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Verificar si el token está en los parámetros de consulta (útil para conexiones WebSocket)
    else if (req.query.token) {
      token = req.query.token;
    }
    
    if (!token) {
      return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
    }
    
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'No autorizado, fallo en el token' });
  }
};

module.exports = authMiddleware;