// WIP
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Add to Cart Endpoint
router.post('/addtocart', auth, async (req, res) => {
  try {
      const { productId, quantity } = req.body;
      const user = await User.findById(req.user.userId);
      user.cart.push({ product: productId, quantity });
      await user.save();
      res.json({ message: 'Item added to cart' });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
});

// Get Cart Endpoint
router.get('/getcart', auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.userId).populate('cart.product');
      res.json(user.cart);
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
});

// Proceed to Checkout Endpoint
router.post('/proceedtocheckout', auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.userId);
      user.cart = [];
      await user.save();
      res.json({ message: 'Checkout successful' });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
});

export default router;
