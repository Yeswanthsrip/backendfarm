const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

// ✅ ADD ANIMAL
router.post('/add', async (req, res) => {
  const { userId, type, name, age, milkPerDay } = req.body;

  const newAnimal = new Animal({
    userId,
    type,
    name,
    age,
    milkPerDay
  });

  await newAnimal.save();
  res.json({ message: 'Animal added' });
});

// ✅ GET ANIMALS (ONLY THAT USER)
router.get('/', async (req, res) => {
  const { userId } = req.query;

  const animals = await Animal.find({ userId });
  res.json(animals);
});

module.exports = router;