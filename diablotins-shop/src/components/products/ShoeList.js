import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ShoeList.css';

const ShoeList = ({ brand }) => {
  const [shoes, setShoes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(brand || 'all');
  const [sortBy, setSortBy] = useState('designation');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const url = selectedBrand === 'all' 
          ? '/api/shoes'
          : `/api/shoes/brand/${encodeURIComponent(selectedBrand)}`;
          
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des chaussures');
        }
        const data = await response.json();
        
        // Tri des chaussures
        const sortedShoes = [...data].sort((a, b) => {
          switch (sortBy) {
            case 'designation':
              return a.designation.localeCompare(b.designation);
            case 'price-asc':
              return a.sizes[0].price - b.sizes[0].price;
            case 'price-desc':
              return b.sizes[0].price - a.sizes[0].price;
            default:
              return 0;
          }
        });

        setShoes(sortedShoes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShoes();
  }, [selectedBrand, sortBy]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="shoe-list">
      <div className="filters">
        <div className="sort-filter">
          <label htmlFor="sort">Trier par :</label>
          <select 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="designation">Nom</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {shoes.map(shoe => (
          <ProductCard key={shoe._id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
};

export default ShoeList; 