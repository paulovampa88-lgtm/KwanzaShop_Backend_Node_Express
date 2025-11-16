
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash: hash });
    res.json({ id: user._id, email: user.email });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: user._id, roles: user.roles }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token });
});
router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no token' });
  const token = auth.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.sub).select('-passwordHash');
    res.json(user);
  } catch (e) {
    res.status(401).json({ error: 'invalid token' });
  }
});
module.exports = router;
