const express = require('express');
const router = express.Router();

// @route   POST /api/upload
// @desc    Upload file
// @access  Private
router.post('/', (req, res) => {
  // Mock upload response
  res.json({
    success: true,
    message: 'File uploaded successfully',
    filename: 'example.jpg',
    url: 'https://example.com/uploads/example.jpg'
  });
});

module.exports = router; 