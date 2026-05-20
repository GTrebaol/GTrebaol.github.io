# Cleopattes - Site Vitrine de Chaussures pour Enfants

## Architecture du Projet

Le projet est divisé en deux parties principales :

### Frontend (React.js)
- Interface utilisateur moderne et réactive
- Gestion d'état avec Redux
- Design responsive avec Material-UI
- Routes avec React Router

### Backend (Node.js + Express)
- API RESTful
- Base de données MongoDB
- Gestion des images avec Cloudinary
- Authentification JWT

## Structure des Dossiers

```
cleopattes/
├── frontend/           # Application React
│   ├── public/        # Fichiers statiques
│   ├── src/           # Code source React
│   │   ├── components/ # Composants React
│   │   ├── pages/     # Pages de l'application
│   │   ├── store/     # État global Redux
│   │   └── utils/     # Utilitaires
│   └── package.json   # Dépendances frontend
│
└── backend/           # API Node.js
    ├── src/          # Code source Node.js
    │   ├── controllers/ # Contrôleurs
    │   ├── models/    # Modèles MongoDB
    │   ├── routes/    # Routes API
    │   └── utils/     # Utilitaires
    └── package.json  # Dépendances backend
```

## Installation

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
npm start
```

## Fonctionnalités

- Affichage des collections de chaussures
- Filtrage par taille, couleur, style
- Galerie d'images
- Formulaire de contact
- Administration des produits

## Description

Ce site web présente les services de Cléopattes, une entreprise de garde d'animaux à domicile. Le site inclut :
- Une page d'accueil avec présentation des services
- Une section services détaillée
- Une section contact avec coordonnées et liens vers les réseaux sociaux

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (vanilla)
- Font Awesome pour les icônes

## Installation

1. Clonez ce dépôt
2. Ouvrez le fichier `index.html` dans votre navigateur

## Structure du projet

```
cleopattes/
├── index.html      # Page principale
├── css/           # Styles CSS
│   └── styles.css
├── js/            # JavaScript
│   └── script.js
├── images/        # Images et logos
└── README.md      # Documentation
```

## Personnalisation

Les couleurs principales du site sont définies dans le fichier `css/styles.css` :
- Couleur principale : #8a9688
- Couleur secondaire : #afc09c
- Couleur d'accent : #d6a676

## Contact

Pour toute question ou modification, contactez Cléo à cleopattes@protonmail.me 