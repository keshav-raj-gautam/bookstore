const express = require('express');
const router = express.Router();
const { sql, config } = require('../models/db');

router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * FROM Books');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
