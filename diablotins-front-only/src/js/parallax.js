document.addEventListener('DOMContentLoaded', () => {
    const parallaxSections = document.querySelectorAll('.section-parallax');

    // Fonction pour gérer l'effet parallax
    const handleParallax = () => {
        parallaxSections.forEach(section => {
            const speed = 0.5;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Vérifie si la section est visible dans la fenêtre
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrolled = window.pageYOffset;
                const yPos = -(scrolled * speed);
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    };

    // Ajoute l'événement de scroll
    window.addEventListener('scroll', handleParallax);
    
    // Appelle la fonction une première fois pour initialiser
    handleParallax();
}); 