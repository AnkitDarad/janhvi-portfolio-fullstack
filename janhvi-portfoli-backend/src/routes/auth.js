import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/users.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const payload = {
    id: user.id,
    username: user.username,
    userType: user.userType,
    displayName: user.displayName,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  res.json({
    token,
    user: payload,
  });
});

router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
