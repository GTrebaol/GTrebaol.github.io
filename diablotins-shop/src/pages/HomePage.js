import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoeList from '../components/products/ShoeList';
import acebosIcon from '../assets/images/icons/acebos.png';
import bellamyIcon from '../assets/images/icons/bellamy.png';
import norvikIcon from '../assets/images/icons/norvik.png';
import './HomePage.css';

const HomePage = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const navigate = useNavigate();

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  const handleBack = () => {
    setSelectedBrand(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
    console.log('Form submitted:', formData);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Les Diablotins</h1>
          <p>Des chaussures confortables et stylées pour vos enfants</p>
          <Link to="/products" className="cta-button">
            Découvrir nos collections
          </Link>
        </div>
      </section>

      <section className="collections-section">
        <h2 className="section-title">Nos Collections</h2>
        {selectedBrand ? (
          <div className="products-container">
            <button className="back-button" onClick={handleBack}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Retour aux collections
            </button>
            <h3 className="brand-title">Collection {selectedBrand}</h3>
            <ShoeList brand={selectedBrand} />
          </div>
        ) : (
          <div className="collections-grid">
            <div className="collection-card" onClick={() => handleBrandSelect('Bellamy')}>
              <img src={bellamyIcon} alt="Bellamy" className="collection-image" />
              <h3>Bellamy</h3>
              <p>Chaussures en cuir de qualité pour les enfants</p>
              <div className="collection-link">
                Découvrir
              </div>
            </div>
            <div className="collection-card" onClick={() => handleBrandSelect('Acebos')}>
              <img src={acebosIcon} alt="Acebos" className="collection-image" />
              <h3>Acebos</h3>
              <p>Chaussures élégantes et confortables pour les enfants</p>
              <div className="collection-link">
                Découvrir
              </div>
            </div>
            <div className="collection-card" onClick={() => handleBrandSelect('Norvik')}>
              <img src={norvikIcon} alt="Norvik" className="collection-image" />
              <h3>Norvik</h3>
              <p>Chaussures robustes et stylées pour les enfants</p>
              <div className="collection-link">
                Découvrir
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="contact-section">
        <h2 className="section-title">Contactez-nous</h2>
        <div className="contact-container">
          <div className="contact-info-side">
            <h2>Nos coordonnées</h2>
            <div className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <div>
                <h3>Email</h3>
                <a href="mailto:contact@lesdiablotins.fr">contact@lesdiablotins.fr</a>
              </div>
            </div>
            <div className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <h3>Téléphone</h3>
                <a href="tel:+33123456789">01 23 45 67 89</a>
              </div>
            </div>
            <div className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <h3>Adresse</h3>
                <address>
                  123 Rue des Diablotins<br />
                  75000 Paris, France
                </address>
              </div>
            </div>
            <div className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <div>
                <h3>Horaires</h3>
                <p>
                  Lundi - Vendredi: 9h - 19h<br />
                  Samedi: 10h - 18h<br />
                  Dimanche: Fermé
                </p>
              </div>
            </div>
          </div>

          <form className="contact-form-side" onSubmit={handleSubmit}>
            <h2>Envoyez-nous un message</h2>
            <div className="contact-form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              />
            </div>
            <button type="submit" className="contact-submit-button">
              Envoyer
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 