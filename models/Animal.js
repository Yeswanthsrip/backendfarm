const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true   // 🔥 important (user-based data)
  },

  type: {
    type: String,
    required: true   // Cow / Buffalo
  },

  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  milkPerDay: {
    type: Number,
    required: true
  }

});

module.exports = mongoose.model('Animal', animalSchema);