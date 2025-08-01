const express = require('express');
const router = express.Router();
const { sql, config } = require('../models/db');

// For simplicity, cart items are stored client-side. But here is a basic example of server-side cart handling.
// You may want to use sessions or a separate Cart table for a persistent cart.

let carts = {}; // In-memory cart storage by userId (for example only; not for production)

router.post('/:userId/add', async (req, res) => {
  const userId = req.params.userId;
  const { bookId, quantity } = req.body;
  if (!userId || !bookId || !quantity) {
    return res.status(400).send('userId, bookId and quantity required');
  }
  if (!carts[userId]) {
    carts[userId] = [];
  }

  // Check if the book already exists in cart and update quantity
  const existing = carts[userId].find(item => item.bookId === bookId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[userId].push({ bookId, quantity });
  }

  res.json({ message: 'Added to cart', cart: carts[userId] });
});

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(carts[userId] || []);
});

router.post('/:userId/remove', (req, res) => {
  const userId = req.params.userId;
  const { bookId } = req.body;
  if (!userId || !bookId) {
    return res.status(400).send('userId and bookId required');
  }

  if (!carts[userId]) {
    return res.status(404).send('Cart not found');
  }

  carts[userId] = carts[userId].filter(item => item.bookId !== bookId);
  res.json({ message: 'Removed from cart', cart: carts[userId] });
});

router.post('/:userId/clear', (req, res) => {
  const userId = req.params.userId;
  carts[userId] = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
