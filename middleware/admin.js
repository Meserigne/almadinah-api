const User = require('../models/User');

module.exports = async function(req, res, next) {
  try {
    // Check if user exists and is admin
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 