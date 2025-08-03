const express = require('express');
const router = express.Router();

// Mock orders data
const orders = [
  {
    id: 1,
    userId: 1,
    items: [
      { productId: 1, quantity: 2, price: 150000 },
      { productId: 3, quantity: 1, price: 75000 }
    ],
    total: 375000,
    status: 'pending',
    createdAt: new Date()
  }
];

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private
router.get('/', (req, res) => {
  res.json(orders);
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', (req, res) => {
  const order = orders.find(ord => ord.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', (req, res) => {
  const { userId, items, total } = req.body;
  
  const newOrder = {
    id: orders.length + 1,
    userId,
    items,
    total,
    status: 'pending',
    createdAt: new Date()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

module.exports = router; 