const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerId: String,
  date: String,
  litres: Number
});

module.exports = mongoose.model('Sale', saleSchema);