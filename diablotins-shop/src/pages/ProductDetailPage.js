import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import shoeService from '../services/api';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        setLoading(true);
        const data = await shoeService.getShoeById(id);
        setShoe(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement du produit. Veuillez réessayer plus tard.');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShoe();
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }
    
    // Logique pour ajouter au panier (à implémenter)
    alert(`Ajouté au panier: ${shoe.designation} - Taille: ${selectedSize}`);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-message">{error}</div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="product-detail-container">
        <div className="error-message">Produit non trouvé</div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    );
  }

  // Trouver le prix pour la taille sélectionnée
  const selectedSizePrice = selectedSize 
    ? shoe.sizes.find(s => s.size === selectedSize)?.price 
    : null;

  // Calculer le prix avec réduction si applicable
  const finalPrice = selectedSizePrice && shoe.reduction > 0
    ? selectedSizePrice * (1 - shoe.reduction / 100)
    : selectedSizePrice;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Retour
      </button>

      <div className="product-detail">
        <div className="product-image-container">
          <img src={shoe.image} alt={shoe.designation} className="product-image" />
          {shoe.isNew && <span className="badge new">Nouveau</span>}
          {shoe.reduction > 0 && (
            <span className="badge sale">-{shoe.reduction}%</span>
          )}
        </div>

        <div className="product-info">
          <h1 className="product-name">{shoe.designation}</h1>
          <p className="product-brand">{shoe.brand}</p>
          
          <div className="product-description">
            <h2>Description</h2>
            <p>{shoe.details}</p>
          </div>

          <div className="size-selection">
            <h2>Taille</h2>
            <div className="size-buttons">
              {shoe.sizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  className={`size-button ${selectedSize === sizeObj.size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(sizeObj.size)}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>

          <div className="price-section">
            {shoe.reduction > 0 ? (
              <>
                <span className="original-price">
                  {selectedSizePrice ? `${selectedSizePrice.toFixed(2)} €` : 'Sélectionnez une taille'}
                </span>
                <span className="sale-price">
                  {finalPrice ? `${finalPrice.toFixed(2)} €` : ''}
                </span>
                <span className="discount-badge">-{shoe.reduction}%</span>
              </>
            ) : (
              <span className="price">
                {selectedSizePrice ? `${selectedSizePrice.toFixed(2)} €` : 'Sélectionnez une taille'}
              </span>
            )}
          </div>

          <button 
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 