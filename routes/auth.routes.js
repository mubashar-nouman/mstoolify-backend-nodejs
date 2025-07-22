import express from 'express';
import { register, login, getCurrentUser, logout } from '../controllers/auth.controller.js';
// import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getCurrentUser);
router.post('/logout', logout)

// Example protected route:
// router.get('/profile', protect, (req, res) => res.send('My profile'));

export default router;
