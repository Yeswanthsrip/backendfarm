const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');
const Customer = require("../models/Customer");

// 🔐 REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, password, ownerName, farmAddress } = req.body;

    // check if user exists
    const existingUser = await Owner.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists ❌' });
    }

    // create owner with new fields
    const owner = new Owner({
      username,
      password,
      ownerName,
      farmAddress
    });

    await owner.save();

    res.json({ message: 'Owner created ✅' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error ❌' });
  }
});


// 🔐 LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const owner = await Owner.findOne({ username, password });

    if (!owner) {
      return res.status(401).json({ message: 'Invalid credentials ❌' });
    }

    // 🔥 SEND OWNER DETAILS ALSO
    res.json({
      message: 'Login success',
      userId: owner._id,
      ownerName: owner.ownerName,
      farmAddress: owner.farmAddress
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error ❌' });
  }
});

//customer login

router.post("/customer/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const customer = await Customer.findOne({
      username,
      password,
    });

    if (!customer) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      message: "Login Success",
      customer,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;