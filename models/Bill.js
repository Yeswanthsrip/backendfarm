const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerId: String,
  month: String,
  totalLitres: Number,
  totalAmount: Number
});

module.exports = mongoose.model('Bill', billSchema);