const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true 
  },

  type: {
    type: String,
    required: true 
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