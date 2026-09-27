const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: String,

  name: String,

  phone: String,

  address: String,

  apartment: String,

  username: String,

  password: String,

  dailyRequirement: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Customer', customerSchema);