import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShoeList from '../components/products/ShoeList';
import './CollectionPage.css';

const CollectionPage = () => {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(-1);
    }, 300); // Durée de l'animation
  };

  const getBrandTitle = (brand) => {
    switch(brand) {
      case 'acebos':
        return 'Acebos';
      case 'bellamy':
        return 'Bellamy';
      case 'norvik':
        return 'Norvik';
      default:
        return brand;
    }
  };

  return (
    <div className={`collection-page ${isExiting ? 'exit' : 'enter'}`}>
      <div className="collection-header">
        <button className="back-button" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour
        </button>
        <h1 className="collection-title">{getBrandTitle(brand)}</h1>
      </div>
      <ShoeList brand={brand} />
    </div>
  );
};

export default CollectionPage; 