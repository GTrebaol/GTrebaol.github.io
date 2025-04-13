import axios from 'axios';

// Configuration de base
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 secondes
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  config => {
    // Ajouter un token d'authentification si disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Erreur serveur
      console.error('Erreur API:', error.response.data);
      
      // Gérer les erreurs spécifiques
      switch (error.response.status) {
        case 401:
          // Rediriger vers la page de connexion
          window.location.href = '/login';
          break;
        case 403:
          // Accès refusé
          console.error('Accès refusé');
          break;
        case 404:
          // Ressource non trouvée
          console.error('Ressource non trouvée');
          break;
        case 500:
          // Erreur serveur
          console.error('Erreur serveur');
          break;
        default:
          console.error('Erreur inconnue');
      }
    } else if (error.request) {
      // Erreur réseau
      console.error('Erreur réseau:', error.request);
    } else {
      // Erreur de configuration
      console.error('Erreur de configuration:', error.message);
    }
    return Promise.reject(error);
  }
);

// Service pour les chaussures
const shoeService = {
  // Récupérer toutes les chaussures avec filtres
  getAllShoes: async (filters = {}) => {
    try {
      const response = await api.get('/shoes', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des chaussures');
    }
  },

  // Récupérer une chaussure par son ID
  getShoeById: async (id) => {
    try {
      const response = await api.get(`/shoes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de la chaussure');
    }
  },

  // Récupérer les nouveautés
  getNewShoes: async () => {
    try {
      const response = await api.get('/shoes', { params: { isNew: true } });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des nouveautés');
    }
  },

  // Récupérer les chaussures en promotion
  getShoesOnSale: async () => {
    try {
      const response = await api.get('/shoes', { params: { isOnSale: true } });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des promotions');
    }
  },

  // Récupérer les chaussures par catégorie
  getShoesByCategory: async (category) => {
    try {
      const response = await api.get('/shoes', { params: { category } });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des chaussures par catégorie');
    }
  },

  // Créer une nouvelle chaussure (admin)
  createShoe: async (shoeData) => {
    try {
      const response = await api.post('/shoes', shoeData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la création de la chaussure');
    }
  },

  // Mettre à jour une chaussure (admin)
  updateShoe: async (id, shoeData) => {
    try {
      const response = await api.put(`/shoes/${id}`, shoeData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la chaussure');
    }
  },

  // Supprimer une chaussure (admin)
  deleteShoe: async (id) => {
    try {
      await api.delete(`/shoes/${id}`);
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la chaussure');
    }
  }
};

export default shoeService; 