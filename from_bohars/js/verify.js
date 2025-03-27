// Ajouter ce fichier pour vérifier le chargement des ressources
document.addEventListener('DOMContentLoaded', function() {
    // Vérification de l'image de fond
    const hero = document.querySelector('.hero-home');
    if (hero) {
        console.log('Hero section trouvée');
        
        // Vérifier si l'image de fond se charge
        const img = new Image();
        img.src = 'images/webp/front.webp';
        
        img.onload = function() {
            console.log('Image de fond chargée avec succès');
        };
        
        img.onerror = function() {
            console.error('Erreur de chargement de l\'image de fond');
            // Fallback vers une couleur de fond
            hero.style.backgroundColor = '#333';
        };
    } else {
        console.error('Hero section non trouvée');
    }

    // Vérification du chargement CSS
    const styles = document.styleSheets;
    console.log('Nombre de feuilles de style chargées :', styles.length);
}); 