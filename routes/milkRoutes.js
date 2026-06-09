const express = require('express');
const router = express.Router();
const Milk = require('../models/Milk');


// ADD MILK
router.post('/add', async (req, res) => {
  try {
    const { userId, date, morning, evening } = req.body;

    // ❌ Future date check
    const today = new Date().toISOString().split("T")[0];

    if (date > today) {
      return res.status(400).json({
        message: "Future dates are not allowed ❌"
      });
    }

    // Check existing record
    const existingMilk = await Milk.findOne({
      userId,
      date
    });

    if (existingMilk) {
      return res.status(409).json({
        message: "Milk record already exists for this date"
      });
    }

    const milk = new Milk({
      userId,
      date,
      morning,
      evening,
      total: morning + evening
    });

    await milk.save();

    res.json(milk);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// UPDATE MILK
router.put('/update', async (req, res) => {
  try {

    const { userId, date, morning, evening } = req.body;

    const milk = await Milk.findOneAndUpdate(
      {
        userId,
        date
      },
      {
        morning,
        evening,
        total: morning + evening
      },
      {
        new: true
      }
    );

    res.json(milk);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// GET MILK HISTORY
router.get('/', async (req, res) => {
  try {

    const { userId } = req.query;

    const milkData = await Milk.find({
      userId
    }).sort({ _id: -1 });

    res.json(milkData);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

// DELETE MILK
router.delete('/delete/:id', async (req, res) => {
  try {

    await Milk.findByIdAndDelete(req.params.id);

    res.json({
      message: "Milk Entry Deleted ✅"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});
module.exports = router;