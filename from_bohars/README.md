# Fromagerie Bohars - Site Web

Site web officiel de la Fromagerie Bohars, une fromagerie-crèmerie, cave et épicerie fine située à Bohars, dans le Finistère.

## Description

Ce site web présente la Fromagerie Bohars, une entreprise familiale spécialisée dans la vente de fromages artisanaux, de vins, de bières et de produits d'épicerie fine. Le site met en avant les services proposés, l'histoire de l'entreprise, les événements organisés et les informations de contact.

## Fonctionnalités

- **Design responsive** : S'adapte à tous les appareils (ordinateurs, tablettes, smartphones)
- **Accessibilité** : Conforme aux normes WCAG pour une accessibilité optimale
- **SEO optimisé** : Balises meta et structure sémantique pour un meilleur référencement
- **Images optimisées** : Format WebP pour des temps de chargement rapides
- **Formulaire de contact** : Avec validation et intégration reCAPTCHA
- **Animations fluides** : Effets visuels subtils pour une expérience utilisateur agréable

## Structure du site

- **Accueil** : Présentation générale de la fromagerie
- **Histoire** : L'histoire de la fromagerie et ses valeurs
- **Nos Services** : Présentation des services proposés (plateaux, buffets, épicerie fine, cave)
- **Événements** : Dégustations et ateliers organisés
- **À propos** : Informations complémentaires sur l'entreprise
- **Contact** : Formulaire de contact et informations pratiques

## Technologies utilisées

- HTML5
- CSS3 (avec variables CSS et Flexbox/Grid)
- JavaScript (vanilla)
- Font Awesome pour les icônes
- Google Fonts (Playfair Display et Montserrat)
- reCAPTCHA pour la sécurité du formulaire

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/votre-utilisateur/fromagerie-bohars.git
   ```

2. Ouvrez le fichier `index.html` dans votre navigateur pour visualiser le site.

## Personnalisation

### Images

Les images sont stockées dans le dossier `images/webp/`. Pour remplacer une image :
1. Convertissez votre nouvelle image au format WebP
2. Placez-la dans le dossier `images/webp/`
3. Mettez à jour les références dans le fichier `index.html`

### Couleurs

Les couleurs principales sont définies comme variables CSS dans le fichier `css/styles.css` :

```css
:root {
    --primary-color: #324a3c;
    --accent-color: #d4af37;
    --text-color: #333;
    --light-bg: #f9f9f9;
    --dark-bg: #324a3c;
    --white: #ffffff;
    --gray: #666;
    --light-gray: #f5f5f5;
    --border-color: #ddd;
    --error-color: #e74c3c;
    --success-color: #2ecc71;
    --focus-color: #3498db;
    --touch-target-size: 44px;
}
```

## Maintenance

### Mise à jour du contenu

Pour mettre à jour le contenu du site, modifiez directement le fichier `index.html`. La structure est organisée en sections pour faciliter les modifications.

### Ajout de nouvelles sections

Pour ajouter une nouvelle section :
1. Créez une nouvelle section dans `index.html` en suivant la structure existante
2. Ajoutez les styles correspondants dans `css/styles.css`
3. Mettez à jour la navigation si nécessaire

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Contact

Pour toute question concernant ce site web, contactez :
- Email : from.bohars@gmail.com
- Téléphone : 06 63 39 85 69 