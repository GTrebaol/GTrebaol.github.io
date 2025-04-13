const Shoe = require('../models/Shoe');

// Récupérer toutes les chaussures
const getAllShoes = async () => {
  try {
    const shoes = await Shoe.find().sort({ createdAt: -1 });
    return shoes;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des chaussures: ${error.message}`);
  }
};

// Récupérer une chaussure par son ID
const getShoeById = async (id) => {
  try {
    const shoe = await Shoe.findById(id);
    if (!shoe) {
      throw new Error('Chaussure non trouvée');
    }
    return shoe;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de la chaussure: ${error.message}`);
  }
};

// Créer une nouvelle chaussure
const createShoe = async (shoeData) => {
  try {
    const shoe = new Shoe(shoeData);
    await shoe.save();
    return shoe;
  } catch (error) {
    throw new Error(`Erreur lors de la création de la chaussure: ${error.message}`);
  }
};

// Mettre à jour une chaussure
const updateShoe = async (id, shoeData) => {
  try {
    const shoe = await Shoe.findByIdAndUpdate(
      id,
      { ...shoeData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!shoe) {
      throw new Error('Chaussure non trouvée');
    }
    return shoe;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la chaussure: ${error.message}`);
  }
};

// Supprimer une chaussure
const deleteShoe = async (id) => {
  try {
    const shoe = await Shoe.findByIdAndDelete(id);
    if (!shoe) {
      throw new Error('Chaussure non trouvée');
    }
    return shoe;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de la chaussure: ${error.message}`);
  }
};

// Récupérer les nouveautés
const getNewShoes = async () => {
  try {
    const newShoes = await Shoe.find({ isNew: true }).sort({ createdAt: -1 });
    return newShoes;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des nouveautés: ${error.message}`);
  }
};

// Récupérer les chaussures en promotion
const getShoesOnSale = async () => {
  try {
    const shoesOnSale = await Shoe.find({ reduction: { $gt: 0 } }).sort({ reduction: -1 });
    return shoesOnSale;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des promotions: ${error.message}`);
  }
};

module.exports = {
  getAllShoes,
  getShoeById,
  createShoe,
  updateShoe,
  deleteShoe,
  getNewShoes,
  getShoesOnSale
}; 