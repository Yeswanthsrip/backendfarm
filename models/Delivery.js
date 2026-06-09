const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  userId: String,
  customerId: String,
  date: String,
  litres: Number
});

module.exports = mongoose.model('Delivery', deliverySchema);