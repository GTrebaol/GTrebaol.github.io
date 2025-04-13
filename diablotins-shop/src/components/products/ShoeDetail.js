import React, { useState } from 'react';
import './ShoeDetail.css';

const ShoeDetail = ({ shoe }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Calculer le prix en fonction de la taille sélectionnée
  const getPrice = () => {
    if (!selectedSize) return null;
    
    const sizePrice = shoe.sizes.find(s => s.size === selectedSize);
    if (!sizePrice) return null;
    
    if (shoe.reduction > 0) {
      return (sizePrice.price * (1 - shoe.reduction / 100)).toFixed(2);
    }
    return sizePrice.price.toFixed(2);
  };
  
  // Grouper les tailles par prix
  const groupSizesByPrice = () => {
    const groups = {};
    
    shoe.sizes.forEach(sizePrice => {
      if (!groups[sizePrice.price]) {
        groups[sizePrice.price] = [];
      }
      groups[sizePrice.price].push(sizePrice.size);
    });
    
    return groups;
  };
  
  const sizeGroups = groupSizesByPrice();
  const price = getPrice();
  
  return (
    <div className="shoe-detail">
      <div className="shoe-detail-image">
        <img src={shoe.image} alt={shoe.designation} />
      </div>
      
      <div className="shoe-detail-info">
        <h1 className="shoe-detail-title">{shoe.designation}</h1>
        <p className="shoe-detail-brand">Marque: {shoe.brand}</p>
        
        <div className="shoe-detail-description">
          <h2>Description</h2>
          <p>{shoe.details}</p>
        </div>
        
        <div className="shoe-detail-sizes">
          <h2>Tailles disponibles</h2>
          
          {Object.entries(sizeGroups).map(([price, sizes]) => (
            <div key={price} className="size-group">
              <p className="size-price">Tailles {sizes.join(', ')} - {price}€</p>
              <div className="size-buttons">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {selectedSize && (
          <div className="shoe-detail-price">
            <h2>Prix</h2>
            <div className="price-container">
              {shoe.reduction > 0 && (
                <div className="price-reduction">
                  <span className="original-price">
                    {shoe.sizes.find(s => s.size === selectedSize).price}€
                  </span>
                  <span className="reduction-badge">-{shoe.reduction}%</span>
                </div>
              )}
              <div className="final-price">{price}€</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoeDetail; 