const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwt: jwtConfig } = require('../config/env');

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token tidak ditemukan' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'User tidak ditemukan' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Token tidak valid' });
  }
};

module.exports = AuthMiddleware;
