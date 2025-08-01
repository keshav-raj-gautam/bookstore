require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES IMPORT
const catalogRoutes = require('./routes/catalog');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');

app.use('/api/catalog', catalogRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
