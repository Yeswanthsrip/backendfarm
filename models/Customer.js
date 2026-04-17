const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: String,   // ✅ ADD THIS
  name: String,
  phone: String,
  address: String,
  apartment: String
});

module.exports = mongoose.model('Customer', customerSchema);