import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/keys.js';

export const generateToken = (userId, userRole) => {
  return jwt.sign({ id: userId, role: userRole }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
