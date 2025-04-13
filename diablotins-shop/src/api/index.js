import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const shoeApi = {
  // Récupérer tous les produits
  getAllShoes: () => api.get('/shoes'),
  
  // Récupérer un produit par son ID
  getShoeById: (id) => api.get(`/shoes/${id}`),
  
  // Récupérer les produits par catégorie
  getShoesByCategory: (category) => api.get(`/shoes/category/${category}`),
  
  // Récupérer les produits en promotion
  getShoesOnSale: () => api.get('/shoes/on-sale'),
  
  // Récupérer les nouveaux produits
  getNewShoes: () => api.get('/shoes/new'),
};

export default api; 