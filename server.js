const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("dotenv").config();

const milkRoutes = require('./routes/milkRoutes');
const customerRoutes = require('./routes/customerRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const billingRoutes = require('./routes/billingRoutes');
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.log("DB Error ❌", err));


// ✅ Routes
app.use('/milk', milkRoutes);
app.use('/customer', customerRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/billing', billingRoutes);
app.use('/auth', authRoutes);
app.use('/animal', animalRoutes);
app.use('/sale', saleRoutes);

// ✅ Render compatible port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});