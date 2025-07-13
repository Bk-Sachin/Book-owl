const express = require('express');
const router = express.Router();
const Cart = require('../model/Cart');
const { requireAuth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// POST /cart - Add items to the cart
router.post('/', requireAuth, [
  body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
  body('items.*.bookId').notEmpty().withMessage('Each item must have a bookId'),
  body('items.*.title').notEmpty().withMessage('Each item must have a title'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Each item must have a quantity of at least 1'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const { items } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
      cart.items = items;
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /cart - Retrieve the current cart details
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /cart - Clear the cart
router.delete('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 