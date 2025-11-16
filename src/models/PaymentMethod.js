
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentMethodSchema = new Schema({
  name: String,
  type: String,
  details: Schema.Types.Mixed,
  active: { type: Boolean, default: true }
});
module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
