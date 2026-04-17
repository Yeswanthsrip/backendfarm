const express = require('express');
const router = express.Router();
const Milk = require('../models/Milk');

router.post('/add', async (req, res) => {
  const { date, morning, evening } = req.body;

  const total = morning + evening;

  const milk = new Milk({ date, morning, evening, total });
  await milk.save();

  res.json(milk);
});

module.exports = router;