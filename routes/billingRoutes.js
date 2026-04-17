const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');
const Bill = require('../models/Bill');

// Get bill by customer
router.get('/:customerId', async (req, res) => {
  const bills = await Bill.find({ customerId: req.params.customerId });
  res.json(bills);
});

router.post('/generate', async (req, res) => {
  const { customerId, pricePerLitre, month } = req.body;

  // Filter deliveries by customer
  const deliveries = await Delivery.find({ customerId });

  let totalLitres = 0;

  deliveries.forEach(d => {
    // check if delivery date includes month
    if (d.date.includes(month)) {
      totalLitres += d.litres;
    }
  });

  const totalAmount = totalLitres * pricePerLitre;

  const bill = new Bill({
    customerId,
    month,
    totalLitres,
    totalAmount
  });

  await bill.save();

  res.json(bill);
});

module.exports = router;