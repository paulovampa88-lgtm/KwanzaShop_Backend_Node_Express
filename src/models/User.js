
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = new Schema({
  label: String,
  street: String,
  city: String,
  province: String,
  postal: String,
  notes: String
}, { _id: true });
const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  passwordHash: String,
  roles: { type: [String], default: ['user'] },
  addresses: [AddressSchema],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
