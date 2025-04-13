// Gestion du défilement fluide avec offset pour la navigation fixe
function initSmoothScroll() {
    const nav = document.querySelector('nav');
    if (!nav) {
        console.error('Navigation element not found');
        return;
    }

    const navHeight = nav.offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gestion du menu mobile
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) {
        console.error("Menu elements not found");
        return;
    }

    // Ajouter un gestionnaire de clic au bouton du menu
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
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
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.classList.remove('active');
            
            // Remettre l'icône du menu en état initial
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Fermer le menu lors d'un clic en dehors du menu
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Gestion du formulaire de contact
function initContactForm() {
    if (typeof jQuery === 'undefined') {
        console.error('jQuery n\'est pas chargé');
        return;
    }

    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (!form || !submitButton || !thankYouMessage) {
        console.error("Form elements not found");
        return;
    }

    // Empêcher la soumission classique du formulaire
    form.addEventListener('submit', function(event) {
        event.preventDefault();
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

        // Désactiver le bouton pendant l'envoi
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        // Exécuter reCAPTCHA v3
        grecaptcha.enterprise.ready(async () => {
            const token = await grecaptcha.enterprise.execute('6LfelRIrAAAAAICy_1LKDvZwW_c2_Z_QYFKJALR3', {action: 'LOGIN'});
            
            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            // Ajouter le token reCAPTCHA
            formDataObj['g-recaptcha-response'] = token;

            // Envoyer les données via AJAX
            $.ajax({
                url: form.action,
                method: "POST",
                dataType: "json",
                data: formDataObj,
                success: function(response) {
                    console.log("Form submission successful:", response);
                    form.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                },
                error: function(xhr, status, error) {
                    console.error('Erreur:', error);
                    console.error('Response:', xhr.responseText);
                    if (xhr.responseJSON && xhr.responseJSON.error === 'reCAPTCHA failed') {
                        alert('Erreur de vérification reCAPTCHA. Veuillez réessayer.');
                    } else {
                        alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
                    }
                    submitButton.disabled = false;
                    submitButton.textContent = 'Envoyer';
                }
            });
        });
    });
}

// Initialiser tout après le chargement complet de la page
window.addEventListener('load', function() {
    initSmoothScroll();
    initMobileMenu();
    initContactForm();
});