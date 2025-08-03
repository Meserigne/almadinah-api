const express = require('express');
const router = express.Router();

// Mock categories data
const categories = [
  { id: 1, name: 'Sacs', slug: 'sacs', description: 'Sacs de luxe' },
  { id: 2, name: 'Femme', slug: 'femme', description: 'Mode féminine' },
  { id: 3, name: 'Homme', slug: 'homme', description: 'Mode masculine' },
  { id: 4, name: 'Enfants', slug: 'enfants', description: 'Mode enfants' },
  { id: 5, name: 'Voyage', slug: 'voyage', description: 'Articles de voyage' },
  { id: 6, name: 'Bijoux & Montres', slug: 'bijoux-montres', description: 'Bijoux et montres' },
  { id: 7, name: 'Parfum et Maquillage', slug: 'parfum-maquillage', description: 'Parfums et cosmétiques' },
  { id: 8, name: 'Décor & Lifestyle', slug: 'decor-lifestyle', description: 'Décoration et lifestyle' },
  { id: 9, name: 'Cadeaux', slug: 'cadeaux', description: 'Cadeaux' },
  { id: 10, name: 'Services Almadina', slug: 'services-almadina', description: 'Services spécialisés' }
];

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', (req, res) => {
  res.json(categories);
});

// @route   GET /api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get('/:id', (req, res) => {
  const category = categories.find(cat => cat.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});

module.exports = router; 