const express = require('express');
const router = express.Router();
const { sql, config } = require('../models/db');

// Admin CRUD operations for Books

// Get all books
router.get('/books', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * FROM Books');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add a new book
router.post('/books', async (req, res) => {
  const { title, author, price, inventory } = req.body;
  if (!title || !author || !price || inventory == null) {
    return res.status(400).send('All fields required: title, author, price, inventory');
  }

  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input('title', sql.NVarChar(255), title)
      .input('author', sql.NVarChar(255), author)
      .input('price', sql.Decimal(10, 2), price)
      .input('inventory', sql.Int, inventory)
      .query('INSERT INTO Books (title, author, price, inventory) VALUES (@title, @author, @price, @inventory)');
    res.json({ message: 'Book added' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a book by ID
router.put('/books/:id', async (req, res) => {
  const id = req.params.id;
  const { title, author, price, inventory } = req.body;
  if (!title || !author || !price || inventory == null) {
    return res.status(400).send('All fields required: title, author, price, inventory');
  }

  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar(255), title)
      .input('author', sql.NVarChar(255), author)
      .input('price', sql.Decimal(10, 2), price)
      .input('inventory', sql.Int, inventory)
      .query('UPDATE Books SET title = @title, author = @author, price = @price, inventory = @inventory WHERE id = @id');
    res.json({ message: 'Book updated' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Books WHERE id = @id');
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
