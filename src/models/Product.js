
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  source: String,
  title: String,
  description: String,
  images: [String],
  thumbnail: String,
  price_usd: Number,
  price_kz: Number,
  currency: String,
  category: String,
  stock: Number,
  product_url: String,
  last_sync: Date,
  metadata: Schema.Types.Mixed
});
ProductSchema.index({ title: 'text', category: 1 });
module.exports = mongoose.model('Product', ProductSchema);
