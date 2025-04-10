// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing mobile menu");
    
    // Sélectionner les éléments du menu
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    console.log("Nav toggle element:", navToggle);
    console.log("Nav links element:", navLinks);
    
    if (navToggle && navLinks) {
        // Ajouter un gestionnaire de clic au bouton du menu
        navToggle.addEventListener('click', function(e) {
            console.log("Nav toggle clicked");
            e.preventDefault(); // Empêcher tout comportement par défaut
            e.stopPropagation(); // Empêcher la propagation de l'événement
            
            // Basculer la classe active sur les liens de navigation
            navLinks.classList.toggle('active');
            
            // Changer l'icône du menu
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            return false;
        });
        
        // Fermer le menu mobile lors du clic sur un lien
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log("Nav link clicked, closing menu");
                e.preventDefault(); // Empêcher le comportement par défaut
                
                // Fermer le menu
                navLinks.classList.remove('active');
                
                // Remettre l'icône du menu en état initial
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Récupérer l'ID de la cible
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                // Faire défiler jusqu'à la cible
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Utiliser setTimeout pour s'assurer que le menu est fermé avant de faire défiler
                    setTimeout(function() {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
                
                return false;
            });
        });
        
        // Fermer le menu lors d'un clic en dehors du menu
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !navToggle.contains(e.target)) {
                console.log("Click outside menu, closing it");
                navLinks.classList.remove('active');
                
                // Remettre l'icône du menu en état initial
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    } else {
        console.error("Menu elements not found");
    }
    
    // Défilement fluide pour les liens d'ancrage (autres que ceux du menu)
    document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
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

// Gestion du formulaire de contact avec reCAPTCHA v2 et AJAX
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");
    
    // Vérifier que jQuery est chargé
    if (typeof jQuery === 'undefined') {
        console.error('jQuery n\'est pas chargé');
        return;
    }

    const form = document.getElementById('contact-form');
    const submitButton = document.querySelector('button[type="button"]');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (form && submitButton && thankYouMessage) {
        console.log("Form and submit button found, setting up handlers");
        
        // Empêcher la soumission classique du formulaire
        form.addEventListener('submit', function(event) {
            console.log("Form submit event intercepted");
            event.preventDefault(); // Empêcher la soumission classique
            return false;
        });
        
        // Ajouter un gestionnaire de clic au bouton d'envoi
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validation du formulaire
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Vérifier si le reCAPTCHA est rempli
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert('Veuillez compléter la vérification de sécurité');
                return;
            }

            // Désactiver le bouton pendant l'envoi
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';

            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            // Ajouter le token reCAPTCHA
            formDataObj['g-recaptcha-response'] = recaptchaResponse;

            // Envoyer les données via AJAX
            $.ajax({
                url: form.action,
                method: "POST",
                dataType: "json",
                data: formDataObj,
                success: function(response) {
                    form.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                },
                error: function(xhr, status, error) {
                    console.error('Erreur:', error);
                    if (xhr.responseJSON && xhr.responseJSON.error === 'reCAPTCHA failed') {
                        alert('Erreur de vérification reCAPTCHA. Veuillez réessayer.');
                        grecaptcha.reset();
                    } else {
                        alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
                    }
                    submitButton.disabled = false;
                    submitButton.textContent = 'Envoyer';
                }
            });
        });
    } else {
        console.error("Form or submit button not found");
    }
});

// Fonction pour vérifier si reCAPTCHA est chargé
function checkRecaptchaLoaded() {
    console.log("Checking if reCAPTCHA is loaded");
    if (typeof grecaptcha === 'undefined') {
        console.error("reCAPTCHA is not loaded yet");
        setTimeout(checkRecaptchaLoaded, 1000); // Vérifier à nouveau dans 1 seconde
        return;
    }
    
    console.log("reCAPTCHA is loaded");
    // Initialiser reCAPTCHA
    grecaptcha.ready(function() {
        console.log("reCAPTCHA is ready");
    });
}

// Vérifier si reCAPTCHA est chargé après un court délai
setTimeout(checkRecaptchaLoaded, 1000);