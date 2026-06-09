const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');


// ✅ ADD CUSTOMER
router.post('/add', async (req, res) => {
  try {

    const { userId, name, phone, address, apartment } = req.body;

    // Duplicate phone check
    const existingCustomer = await Customer.findOne({
      userId,
      phone
    });

    if (existingCustomer) {
      return res.status(409).json({
        message: "Customer already exists ❌"
      });
    }

    const customer = new Customer({
      userId,
      name,
      phone,
      address,
      apartment
    });

    await customer.save();

    res.json({
      message: "Customer Added ✅",
      customer
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ UPDATE CUSTOMER
router.put('/update', async (req, res) => {
  try {

    const {
      userId,
      name,
      phone,
      address,
      apartment
    } = req.body;

    const customer = await Customer.findOneAndUpdate(
      {
        userId,
        phone
      },
      {
        name,
        address,
        apartment
      },
      {
        new: true
      }
    );

    res.json({
      message: "Customer Updated ✅",
      customer
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// ✅ GET CUSTOMERS
router.get('/', async (req, res) => {
  try {

    const { userId } = req.query;

    const customers = await Customer.find({
      userId
    }).sort({ _id: -1 });

    res.json(customers);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

// DELETE CUSTOMER
router.delete('/delete/:id', async (req, res) => {
  try {

    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Customer Deleted ✅"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

module.exports = router;