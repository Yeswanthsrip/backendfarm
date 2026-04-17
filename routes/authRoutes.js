const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const owner = new Owner({ username, password });
  await owner.save();

  res.json({ message: 'Owner created' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const owner = await Owner.findOne({ username, password });

  if (owner) {
    res.json({
      message: 'Login success',
      userId: owner._id   // 🔥 IMPORTANT
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;