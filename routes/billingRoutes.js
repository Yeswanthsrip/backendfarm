const express = require("express");
const router = express.Router();

const Delivery = require("../models/Delivery");
const Bill = require("../models/Bill");


// ===============================
// CUSTOMER MONTHLY BILL
// ===============================
router.get("/customer/:id/:month/:price", async (req, res) => {
  try {
    const { id, month, price } = req.params;

    const deliveries = await Delivery.find({
      customerId: id
    });

    const monthlyDeliveries = deliveries.filter((d) =>
      d.date.startsWith(month)
    );

    const totalLitres = monthlyDeliveries.reduce(
      (sum, d) => sum + d.litres,
      0
    );

    const totalAmount = totalLitres * Number(price);

    res.json({
      totalLitres,
      totalAmount
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ===============================
// GET SAVED BILLS
// ===============================
router.get("/:customerId", async (req, res) => {
  try {
    const bills = await Bill.find({
      customerId: req.params.customerId
    });

    res.json(bills);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ===============================
// GENERATE BILL
// ===============================
router.post("/generate", async (req, res) => {
  try {

    const {
      customerId,
      pricePerLitre,
      month
    } = req.body;

    const deliveries = await Delivery.find({
      customerId
    });

    let totalLitres = 0;

    deliveries.forEach((d) => {
      if (d.date.startsWith(month)) {
        totalLitres += d.litres;
      }
    });

    const totalAmount = totalLitres * Number(pricePerLitre);

    const bill = new Bill({
      customerId,
      month,
      totalLitres,
      totalAmount
    });

    await bill.save();

    res.json(bill);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;