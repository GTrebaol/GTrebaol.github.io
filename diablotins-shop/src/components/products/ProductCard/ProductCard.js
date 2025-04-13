import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({ shoe }) => {
  const {
    _id,
    designation,
    brand,
    image,
    isNew,
    reduction,
    averageRating
  } = shoe;

  return (
    <div className="product-card">
      <Link to={`/products/${_id}`} className="product-card__link">
        <div className="product-card__image-container">
          <img 
            src={image} 
            alt={designation} 
            className="product-card__image"
          />
          {isNew && (
            <span className="product-card__badge product-card__badge--new">
              Nouveau
            </span>
          )}
          {reduction > 0 && (
            <span className="product-card__badge product-card__badge--sale">
              -{reduction}%
            </span>
          )}
        </div>
        
        <div className="product-card__content">
          <h3 className="product-card__title">{designation}</h3>
          <p className="product-card__brand">{brand}</p>
          
          {averageRating > 0 && (
            <div className="product-card__rating">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`product-card__star ${
                    i < averageRating ? 'product-card__star--filled' : ''
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  shoe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    reduction: PropTypes.number,
    averageRating: PropTypes.number
  }).isRequired
};

export default ProductCard; 