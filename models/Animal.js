const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  type: String,     // Cow or Buffalo
  name: String,
  age: Number,
  milkPerDay: Number
});

module.exports = mongoose.model('Animal', animalSchema);