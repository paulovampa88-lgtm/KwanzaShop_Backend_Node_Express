
const express = require('express');
const Product = require('../models/Product');
const PaymentMethod = require('../models/PaymentMethod');
const Order = require('../models/Order');
const router = express.Router();
router.get('/dashboard', async (req, res) => {
  const orders = await Order.countDocuments();
  const revenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$total_kz' } } }]);
  res.json({ orders, revenue: revenue[0] ? revenue[0].total : 0 });
});
router.get('/payment-methods', async (req, res) => {
  const methods = await PaymentMethod.find();
  res.json(methods);
});
router.post('/payment-methods', async (req, res) => {
  const p = await PaymentMethod.create(req.body);
  res.json(p);
});
router.put('/payment-methods/:id', async (req, res) => {
  const p = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});
router.post('/aliexpress/sync', async (req, res) => {
  const aliexpressService = require('../services/aliexpressService');
  try {
    await aliexpressService.syncCategories(['All','Fashion','Electronics','Beauty','Home']);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = router;
