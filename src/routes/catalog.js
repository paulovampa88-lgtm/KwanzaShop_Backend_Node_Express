
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
router.get('/', async (req, res) => {
  const { query, category, page = 1, limit = 20, min_kz, max_kz } = req.query;
  const q = {};
  if (query) q.$text = { $search: query };
  if (category) q.category = category;
  if (min_kz || max_kz) q.price_kz = {};
  if (min_kz) q.price_kz.$gte = Number(min_kz);
  if (max_kz) q.price_kz.$lte = Number(max_kz);
  const skip = (Number(page) - 1) * Number(limit);
  const products = await Product.find(q).skip(skip).limit(Number(limit));
  res.json(products);
});
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'not found' });
  res.json(p);
});
module.exports = router;
