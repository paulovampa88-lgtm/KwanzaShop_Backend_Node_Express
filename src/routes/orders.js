
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
router.post('/', async (req, res) => {
  const { userId, items, shippingAddress, payment } = req.body;
  const total = items.reduce((s, it) => s + (it.price_kz * it.qty), 0);
  const order = await Order.create({ userId, items, shippingAddress, payment, total_kz: total, status: 'pending' });
  res.json(order);
});
router.get('/:id', async (req, res) => {
  const o = await Order.findById(req.params.id);
  if (!o) return res.status(404).json({ error: 'not found' });
  res.json(o);
});
module.exports = router;
