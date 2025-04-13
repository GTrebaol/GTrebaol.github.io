const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoeController');

// Middleware de logging
router.use((req, res, next) => {
  console.log('=== Route des chaussures ===');
  console.log('Méthode:', req.method);
  console.log('URL:', req.url);
  console.log('Path:', req.path);
  console.log('Query:', req.query);
  console.log('Params:', req.params);
  next();
});

// Route pour récupérer toutes les chaussures
router.get('/', (req, res, next) => {
  console.log('Route GET / appelée');
  next();
}, shoeController.getAllShoes);

// Route pour récupérer les chaussures par marque
router.get('/brand/:brand', (req, res, next) => {
  console.log('Route GET /brand/:brand appelée');
  console.log('Marque demandée:', req.params.brand);
  next();
}, shoeController.getShoesByBrand);

// Route pour récupérer une chaussure par son ID
router.get('/:id', (req, res, next) => {
  console.log('Route GET /:id appelée');
  console.log('ID demandé:', req.params.id);
  next();
}, shoeController.getShoeById);

module.exports = router; 