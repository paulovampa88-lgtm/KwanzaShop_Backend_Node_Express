
const express = require('express');
const PaymentMethod = require('../models/PaymentMethod');
const router = express.Router();
router.get('/methods', async (req, res) => {
  const methods = await PaymentMethod.find({ active: true });
  res.json(methods);
});
router.post('/create-session', async (req, res) => {
  const { orderId, amount_kz, method } = req.body;
  return res.json({ payment_url: 'https://redotpay.example/checkout?ref=' + orderId, reference: 'KWZ-' + Date.now() });
});
router.post('/webhook', async (req, res) => {
  console.log('webhook received', req.body);
  res.status(200).json({ ok: true });
});
module.exports = router;
