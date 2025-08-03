const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET /api/products - Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      subcategory, 
      search, 
      minPrice, 
      maxPrice, 
      sort = 'createdAt',
      order = 'desc',
      limit = 20,
      page = 1
    } = req.query;

    // Construire le filtre
    let filter = {};
    
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$text = { $search: search };
    }

    // Construire le tri
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Récupérer un produit
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products - Créer un produit (admin)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/products/:id - Modifier un produit (admin)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/products/:id - Supprimer un produit (admin)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 