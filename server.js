const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// ✅ MongoDB Atlas Connection (FINAL CORRECT)
mongoose.connect(
  'mongodb+srv://sriyeswanth9_db_user:UXenE9q1TYjtXvkc@cluster0.kmvscrp.mongodb.net/dairyDB'
)
.then(() => console.log('DB Connected ✅'))
.catch(err => console.log('DB Error ❌', err));

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