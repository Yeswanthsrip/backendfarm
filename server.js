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
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/dairyDB')
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

app.use('/milk', milkRoutes);
app.use('/customer', customerRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/billing', billingRoutes);
app.use('/auth', authRoutes);
app.use('/animal', animalRoutes);
app.use('/sale', saleRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));