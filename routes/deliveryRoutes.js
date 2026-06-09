const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');


// ✅ ADD DELIVERY
router.post('/add', async (req, res) => {
  try {

    const {
      userId,
      customerId,
      date,
      litres
    } = req.body;

    const existingDelivery = await Delivery.findOne({
      userId,
      customerId,
      date
    });

    if (existingDelivery) {
      return res.status(409).json({
        message: "Delivery already exists ❌"
      });
    }

    const delivery = new Delivery({
      userId,
      customerId,
      date,
      litres
    });

    await delivery.save();

    res.json({
      message: "Delivery Added ✅",
      delivery
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ UPDATE DELIVERY
router.put('/update', async (req, res) => {
  try {

    const {
      userId,
      customerId,
      date,
      litres
    } = req.body;

    const delivery = await Delivery.findOneAndUpdate(
      {
        userId,
        customerId,
        date
      },
      {
        litres
      },
      {
        new: true
      }
    );

    res.json({
      message: "Delivery Updated ✅",
      delivery
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ DELETE DELIVERY
router.delete('/delete/:id', async (req, res) => {
  try {

    await Delivery.findByIdAndDelete(req.params.id);

    res.json({
      message: "Delivery Deleted ✅"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ GET DELIVERIES
router.get('/', async (req, res) => {
  try {

    const { userId } = req.query;

    const deliveries = await Delivery.find({
      userId
    }).sort({ _id: -1 });

    res.json(deliveries);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

module.exports = router;