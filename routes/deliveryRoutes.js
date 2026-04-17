const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

// Get deliveries (ONLY THIS USER)
router.get('/', async (req, res) => {
  const { userId } = req.query;

  const data = await Delivery.find({ userId });
  res.json(data);
});

// Add delivery
router.post('/add', async (req, res) => {
  const { userId, customerId, date, litres } = req.body;

  const delivery = new Delivery({
    userId,
    customerId,
    date,
    litres
  });

  await delivery.save();
  res.json(delivery);
});

module.exports = router;