// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        // Toggle menu when burger icon is clicked
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from firing immediately
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Gestion du formulaire après soumission
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un gestionnaire pour le message de remerciement après la soumission du formulaire
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function() {
            // Le formulaire sera soumis par reCAPTCHA, mais nous pouvons préparer l'affichage du message de remerciement
            setTimeout(function() {
                form.style.display = 'none';
                document.getElementById('thank-you-message').style.display = 'block';
            }, 1000);
        });
    }
});

// Fonction de callback pour reCAPTCHA
function onSubmit(token) {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    
    // Ajouter le token reCAPTCHA au formulaire
    formData.append('g-recaptcha-response', token);
    
    // Envoyer le formulaire via Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Cacher le formulaire et afficher le message de remerciement
            form.style.display = 'none';
            document.getElementById('thank-you-message').style.display = 'block';
        } else {
            throw new Error('Erreur lors de l\'envoi du message');
        }
    })
    .catch(error => {
        alert('Une erreur est survenue. Veuillez réessayer.');
        console.error('Erreur:', error);
        // Réinitialiser le reCAPTCHA en cas d'erreur
        grecaptcha.reset();
    });
} 