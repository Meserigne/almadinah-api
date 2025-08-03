const express = require('express');
const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private
router.get('/dashboard', (req, res) => {
  res.json({
    totalUsers: 150,
    totalOrders: 45,
    totalRevenue: 12500000,
    recentOrders: [
      { id: 1, customer: 'John Doe', amount: 250000, status: 'completed' },
      { id: 2, customer: 'Jane Smith', amount: 180000, status: 'pending' }
    ]
  });
});

// @route   GET /api/admin/stats
// @desc    Get admin statistics
// @access  Private
router.get('/stats', (req, res) => {
  res.json({
    users: { total: 150, newThisMonth: 25 },
    orders: { total: 45, pending: 12, completed: 33 },
    revenue: { total: 12500000, thisMonth: 2500000 }
  });
});

module.exports = router; 