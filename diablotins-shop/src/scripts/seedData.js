const mongoose = require('mongoose');
const Shoe = require('../models/Shoe');
require('dotenv').config();

// Données de test pour les chaussures
const shoesData = [
  {
    designation: "Lami à velcro",
    brand: "Bellamy",
    description: "Chaussure en cuir noir avec empiècement nubuck noir. Détails élégants en cuir blanc sur le côté et languette en cuir vert pour une touche de couleur.",
    details: "Chaussure en cuir de qualité avec fermeture à velcro pour un confort optimal. Semelle antidérapante et doublure intérieure confortable.",
    sizes: [
      { size: 32, price: 70, stock: 5, sku: "BLM-LV-32" },
      { size: 33, price: 70, stock: 5, sku: "BLM-LV-33" },
      { size: 34, price: 70, stock: 5, sku: "BLM-LV-34" }
    ],
    image: "/images/products/bellamy.jpg",
    images: [
      "/images/products/bellamy.jpg"
    ],
    category: "enfant",
    gender: "unisexe",
    season: "toute saison",
    isNew: true,
    reduction: 0,
    status: "published",
    meta: {
      title: "Bellamy Lami à velcro - Chaussures enfants en cuir",
      description: "Chaussures en cuir noir avec empiècement nubuck et détails élégants. Fermeture à velcro pour un confort optimal.",
      keywords: ["chaussures", "enfants", "cuir", "velcro", "bellamy"]
    },
    shipping: {
      weight: 0.5,
      dimensions: {
        length: 20,
        width: 10,
        height: 8
      }
    }
  },
  {
    designation: "Acebos Sport",
    brand: "Acebos",
    description: "Chaussure de sport légère et confortable pour enfants.",
    details: "Chaussure de sport avec semelle souple et tige en mesh respirant. Idéale pour les activités quotidiennes.",
    sizes: [
      { size: 30, price: 65, stock: 5, sku: "ACB-SP-30" },
      { size: 31, price: 65, stock: 5, sku: "ACB-SP-31" },
      { size: 32, price: 65, stock: 5, sku: "ACB-SP-32" }
    ],
    image: "/images/products/acebos.jpg",
    images: [
      "/images/products/acebos.jpg"
    ],
    category: "enfant",
    gender: "unisexe",
    season: "toute saison",
    isNew: true,
    reduction: 0,
    status: "published",
    meta: {
      title: "Acebos Sport - Chaussures de sport pour enfants",
      description: "Chaussures de sport légères et confortables pour les activités quotidiennes.",
      keywords: ["chaussures", "sport", "enfants", "acebos"]
    },
    shipping: {
      weight: 0.4,
      dimensions: {
        length: 19,
        width: 9,
        height: 7
      }
    }
  },
  {
    designation: "Norvik Adventure",
    brand: "Norvik",
    description: "Chaussure de randonnée robuste pour enfants.",
    details: "Chaussure de randonnée avec semelle antidérapante et tige en cuir résistant. Parfaite pour les aventures en plein air.",
    sizes: [
      { size: 33, price: 75, stock: 5, sku: "NRV-AD-33" },
      { size: 34, price: 75, stock: 5, sku: "NRV-AD-34" },
      { size: 35, price: 75, stock: 5, sku: "NRV-AD-35" }
    ],
    image: "/images/products/norvik.jpg",
    images: [
      "/images/products/norvik.jpg"
    ],
    category: "enfant",
    gender: "unisexe",
    season: "toute saison",
    isNew: true,
    reduction: 0,
    status: "published",
    meta: {
      title: "Norvik Adventure - Chaussures de randonnée pour enfants",
      description: "Chaussures de randonnée robustes et confortables pour les aventures en plein air.",
      keywords: ["chaussures", "randonnée", "enfants", "norvik"]
    },
    shipping: {
      weight: 0.6,
      dimensions: {
        length: 21,
        width: 11,
        height: 9
      }
    }
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err.message);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    // Nettoyer la base de données
    await Shoe.deleteMany({});
    console.log('Base de données nettoyée');

    // Insérer les nouvelles données
    await Shoe.insertMany(shoesData);
    console.log('Données insérées avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'insertion des données:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

// Exécuter le script
connectDB().then(() => {
  seedDB();
}); 