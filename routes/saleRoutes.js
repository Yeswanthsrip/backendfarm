const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Add sale
router.post('/add', async (req, res) => {
  const { customerId, date, litres } = req.body;

  const sale = new Sale({
    customerId,
    date,
    litres
  });

  await sale.save();
  res.json(sale);
});

// Get all sales
router.get('/', async (req, res) => {
  const data = await Sale.find();
  res.json(data);
});

module.exports = router;