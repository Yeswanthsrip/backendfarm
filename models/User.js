const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // 🔥 NEW FIELDS
  ownerName: {
    type: String,
    required: true
  },

  farmAddress: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);