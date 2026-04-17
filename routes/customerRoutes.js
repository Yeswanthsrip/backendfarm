const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Add customer
router.post('/add', async (req, res) => {
  const { userId, name } = req.body;

  const customer = new Customer({ userId, name });
  await customer.save();

  res.json(customer);
});

// Get customers (ONLY THIS USER)
router.get('/', async (req, res) => {
  const { userId } = req.query;

  const customers = await Customer.find({ userId });
  res.json(customers);
});

module.exports = router;