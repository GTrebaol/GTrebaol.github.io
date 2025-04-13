import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ shoe }) => {
  const { _id, designation, brand, sizes, colors, imageUrl } = shoe;
  const price = sizes && sizes.length > 0 ? sizes[0].price : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${_id}`} className="product-link">
        <div className="product-image-container">
          <img src={imageUrl} alt={designation} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-brand">{brand}</h3>
          <h2 className="product-name">{designation}</h2>
          <p className="product-price">{formatPrice(price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 