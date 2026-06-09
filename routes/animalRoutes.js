const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');


// ✅ ADD ANIMAL
router.post('/add', async (req, res) => {
  try {

    const { userId, type, name, age, milkPerDay } = req.body;

    // Duplicate check
    const existingAnimal = await Animal.findOne({
      userId,
      name
    });

    if (existingAnimal) {
      return res.status(409).json({
        message: "Animal already exists ❌"
      });
    }

    const newAnimal = new Animal({
      userId,
      type,
      name,
      age,
      milkPerDay
    });

    await newAnimal.save();

    res.json({
      message: "Animal Added ✅",
      animal: newAnimal
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ UPDATE ANIMAL
router.put('/update', async (req, res) => {
  try {

    const {
      userId,
      type,
      name,
      age,
      milkPerDay
    } = req.body;

    const animal = await Animal.findOneAndUpdate(
      {
        userId,
        name
      },
      {
        type,
        age,
        milkPerDay
      },
      {
        new: true
      }
    );

    res.json({
      message: "Animal Updated ✅",
      animal
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ DELETE ANIMAL
router.delete('/delete/:id', async (req, res) => {
  try {

    await Animal.findByIdAndDelete(req.params.id);

    res.json({
      message: "Animal Deleted ✅"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ GET ALL ANIMALS OF LOGGED-IN OWNER
router.get('/', async (req, res) => {
  try {

    const { userId } = req.query;

    const animals = await Animal.find({
      userId
    }).sort({ _id: -1 });

    res.json(animals);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

module.exports = router;