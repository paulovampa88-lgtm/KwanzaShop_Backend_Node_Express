
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const OrderItem = new Schema({
  productId: String,
  qty: Number,
  price_kz: Number
}, { _id: false });
const OrderSchema = new Schema({
  userId: String,
  items: [OrderItem],
  shippingAddress: Schema.Types.Mixed,
  payment: Schema.Types.Mixed,
  total_kz: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
