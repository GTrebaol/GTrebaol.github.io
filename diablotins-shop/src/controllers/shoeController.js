const Shoe = require('../models/Shoe');
const shoeService = require('../services/shoeService');

// Récupérer toutes les chaussures
exports.getAllShoes = async (req, res) => {
  console.log('=== getAllShoes ===');
  console.log('Requête reçue:', req.method, req.url);
  console.log('Query params:', req.query);
  console.log('Headers:', req.headers);
  
  try {
    console.log('Recherche de toutes les chaussures...');
    const shoes = await Shoe.find({});
    console.log('Nombre de chaussures trouvées:', shoes.length);
    console.log('Première chaussure:', shoes[0] ? JSON.stringify(shoes[0], null, 2) : 'Aucune chaussure');
    res.json(shoes);
  } catch (error) {
    console.error('Erreur dans getAllShoes:', error);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les chaussures par marque
exports.getShoesByBrand = async (req, res) => {
  console.log('=== getShoesByBrand ===');
  console.log('Requête reçue:', req.method, req.url);
  console.log('Paramètres:', req.params);
  console.log('Headers:', req.headers);
  
  try {
    const { brand } = req.params;
    console.log('Recherche des chaussures pour la marque:', brand);
    const shoes = await Shoe.find({ brand });
    console.log('Nombre de chaussures trouvées:', shoes.length);
    console.log('Première chaussure:', shoes[0] ? JSON.stringify(shoes[0], null, 2) : 'Aucune chaussure');
    res.json(shoes);
  } catch (error) {
    console.error('Erreur dans getShoesByBrand:', error);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une chaussure par son ID
exports.getShoeById = async (req, res) => {
  console.log('=== getShoeById ===');
  console.log('Requête reçue:', req.method, req.url);
  console.log('Paramètres:', req.params);
  console.log('Headers:', req.headers);
  
  try {
    const shoe = await Shoe.findById(req.params.id);
    console.log('Chaussure trouvée:', shoe ? JSON.stringify(shoe, null, 2) : 'Non trouvée');
    if (shoe) {
      res.json(shoe);
    } else {
      res.status(404).json({ message: 'Chaussure non trouvée' });
    }
  } catch (error) {
    console.error('Erreur dans getShoeById:', error);
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle chaussure
exports.createShoe = async (req, res) => {
  try {
    const shoe = await shoeService.createShoe(req.body);
    res.status(201).json(shoe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une chaussure
exports.updateShoe = async (req, res) => {
  try {
    const shoe = await shoeService.updateShoe(req.params.id, req.body);
    res.status(200).json(shoe);
  } catch (error) {
    if (error.message === 'Chaussure non trouvée') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

// Supprimer une chaussure
exports.deleteShoe = async (req, res) => {
  try {
    await shoeService.deleteShoe(req.params.id);
    res.status(200).json({ message: 'Chaussure supprimée avec succès' });
  } catch (error) {
    if (error.message === 'Chaussure non trouvée') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Récupérer les nouveautés
exports.getNewShoes = async (req, res) => {
  try {
    const newShoes = await shoeService.getNewShoes();
    res.status(200).json(newShoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les chaussures en promotion
exports.getShoesOnSale = async (req, res) => {
  try {
    const shoesOnSale = await shoeService.getShoesOnSale();
    res.status(200).json(shoesOnSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 