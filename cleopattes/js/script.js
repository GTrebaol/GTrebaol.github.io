// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        });
    });
    
    // Défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Gestion du formulaire de contact avec reCAPTCHA v3 et AJAX
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");
    
    // Vérifier si le formulaire existe
    const form = document.getElementById('contact-form');
    console.log("Form element:", form);
    
    // Vérifier si le bouton existe
    const submitButton = document.getElementById('submit-button');
    console.log("Submit button element:", submitButton);
    
    // Vérifier si le message de remerciement existe
    const thankYouMessage = document.getElementById('thank-you-message');
    console.log("Thank you message element:", thankYouMessage);
    
    if (form && submitButton) {
        console.log("Form and submit button found, setting up handlers");
        
        // Empêcher la soumission classique du formulaire
        form.addEventListener('submit', function(event) {
            console.log("Form submit event intercepted");
            event.preventDefault(); // Empêcher la soumission classique
            return false;
        });
        
        // Ajouter un gestionnaire de clic au bouton d'envoi
        submitButton.addEventListener('click', function(event) {
            console.log("Submit button clicked");
            event.preventDefault(); // Empêcher la soumission classique
            
            // Valider le formulaire avant de l'envoyer
            if (!form.checkValidity()) {
                console.log("Form validation failed");
                // Déclencher l'événement de validation pour afficher les messages d'erreur
                form.reportValidity();
                return false;
            }
            
            // Désactiver le bouton pendant l'envoi pour éviter les soumissions multiples
            submitButton.disabled = true;
            submitButton.textContent = "Envoi en cours...";
            
            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Vérifier si grecaptcha est disponible
            if (typeof grecaptcha !== 'undefined') {
                console.log("grecaptcha is available, executing");
                
                // Exécuter reCAPTCHA v3
                grecaptcha.ready(function() {
                    console.log("grecaptcha is ready");
                    grecaptcha.execute('6LfelRIrAAAAAICy_1LKDvZwW_c2_Z_QYFKJALR3', {action: 'submit'})
                        .then(function(token) {
                            console.log("reCAPTCHA token received, submitting form");
                            
                            // Ajouter le token reCAPTCHA aux données du formulaire
                            formDataObj['g-recaptcha-response'] = token;
                            
                            // Ajouter un champ spécial que Formspree utilise pour savoir qu'on veut une réponse AJAX
                            formDataObj['_format'] = 'json';
                            
                            console.log("Sending form data to Formspree via AJAX");
                            console.log("Form data:", formDataObj);
                            
                            // Envoyer les données via jQuery AJAX
                            $.ajax({
                                url: form.action,
                                method: "POST",
                                dataType: "json",
                                data: formDataObj,
                                success: function() {
                                    console.log("Form submitted successfully");
                                    form.style.display = 'none';
                                    thankYouMessage.style.display = 'block';
                                },
                                error: function(err) {
                                    console.error("Formspree error:", err);
                                    
                                    // Afficher un message d'erreur plus spécifique si c'est un problème de reCAPTCHA
                                    if (err.responseText && err.responseText.includes("reCAPTCHA failed")) {
                                        alert("La vérification de sécurité a échoué. Veuillez réessayer ou nous contacter directement par téléphone.");
                                    } else {
                                        alert("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer ou nous contacter directement par téléphone.");
                                    }
                                    
                                    // Réactiver le bouton en cas d'erreur
                                    submitButton.disabled = false;
                                    submitButton.textContent = "Envoyer";
                                }
                            });
                        })
                        .catch(function(error) {
                            console.error("reCAPTCHA error:", error);
                            alert("Une erreur s'est produite avec la vérification de sécurité. Veuillez réessayer.");
                            
                            // Réactiver le bouton en cas d'erreur
                            submitButton.disabled = false;
                            submitButton.textContent = "Envoyer";
                        });
                });
            } else {
                console.error("grecaptcha is not available");
                alert("La vérification de sécurité n'est pas disponible. Veuillez réessayer plus tard.");
                
                // Réactiver le bouton en cas d'erreur
                submitButton.disabled = false;
                submitButton.textContent = "Envoyer";
            }
            
            return false; // Empêcher la soumission classique
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