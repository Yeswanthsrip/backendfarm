const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // 🔥 NEW FIELDS ADD CHEYYALI
  ownerName: {
    type: String,
    required: true
  },

  farmAddress: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Owner', ownerSchema);