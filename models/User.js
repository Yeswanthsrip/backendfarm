const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  role: String // owner or customer
});

module.exports = mongoose.model('User', userSchema);