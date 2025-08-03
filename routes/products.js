const express = require('express');
const router = express.Router();

// Mock products data
const products = [
  {
    id: 1,
    name: 'Sac de Luxe',
    description: 'Sac de luxe en cuir véritable',
    price: 150000,
    category: 'sacs',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    inStock: true
  },
  {
    id: 2,
    name: 'Montre Élégante',
    description: 'Montre élégante pour homme',
    price: 250000,
    category: 'bijoux-montres',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
    inStock: true
  }
];

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
  res.json(products);
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private
router.post('/', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private
router.put('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json(products[productIndex]);
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted' });
});

module.exports = router; 