const express = require('express');
const router = express.Router();
const { sql, config } = require('../models/db');

// Place a new order
router.post('/', async (req, res) => {
  const { items, total, customer } = req.body; // items is expected to be a JSON array of { bookId, quantity }

  if (!items || !total || !customer) {
    return res.status(400).send('Items, total, and customer info required');
  }

  try {
    let pool = await sql.connect(config);
    const itemsString = JSON.stringify(items);

    const result = await pool.request()
      .input('items', sql.NVarChar(sql.MAX), itemsString)
      .input('total', sql.Decimal(10, 2), total)
      .input('customer', sql.NVarChar(255), customer)
      .query('INSERT INTO Orders (items, total, customer) VALUES (@items, @total, @customer); SELECT SCOPE_IDENTITY() AS id');

    res.json({ message: 'Order placed', orderId: result.recordset[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all orders (admin view)
router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * FROM Orders ORDER BY createdAt DESC');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
