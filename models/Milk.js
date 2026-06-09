const mongoose = require('mongoose');

const milkSchema = new mongoose.Schema({
  userId: String,
  date: String,
  morning: Number,
  evening: Number,
  total: Number
});

module.exports = mongoose.model('Milk', milkSchema);