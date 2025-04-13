// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    
    // Trap focus within mobile menu when open
    if (!isExpanded) {
        const focusableElements = navLinks.querySelectorAll('a, button');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        navLinks.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
            if (e.key === 'Escape') {
                toggleMobileMenu();
            }
        });
    }

    // Change l'icône du menu
    const menuIcon = mobileMenuBtn.querySelector('i');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (target === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus the target element after scrolling
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                    targetElement.removeAttribute('tabindex');
                }, 1000);
            }
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Fade-in animation for sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0');
    observer.observe(section);
});

// Form validation and submission handling
const mainContactForm = document.querySelector('.contact-form');
if (mainContactForm) {
    const formFields = mainContactForm.querySelectorAll('input, textarea');
    
    // Add validation attributes
    formFields.forEach(field => {
        field.setAttribute('aria-invalid', 'false');
        field.setAttribute('aria-describedby', `${field.id}-error`);
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.id = `${field.id}-error`;
        errorElement.className = 'error-message';
        errorElement.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorElement);
        
        // Validate on blur and input
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => validateField(field));
    });
    
    function validateField(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;
        let errorMessage = '';
        
        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Ce champ est requis';
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer une adresse email valide';
        }
        
        field.setAttribute('aria-invalid', !isValid);
        errorElement.textContent = errorMessage;
        return isValid;
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    mainContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Focus first invalid field
            const firstInvalidField = formFields.find(field => field.getAttribute('aria-invalid') === 'true');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }
        
        // Get form data
        const formData = new FormData(mainContactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Show loading state
            const submitButton = mainContactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            // Verify reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                throw new Error('Veuillez valider le reCAPTCHA');
            }
            
            // Here you would typically send the data to a server
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.setAttribute('role', 'alert');
            successMessage.textContent = 'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.';
            mainContactForm.insertBefore(successMessage, mainContactForm.firstChild);
            
            // Reset form
            mainContactForm.reset();
            grecaptcha.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } catch (error) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.setAttribute('role', 'alert');
            errorMessage.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer plus tard.';
            mainContactForm.insertBefore(errorMessage, mainContactForm.firstChild);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button state
            const submitButton = mainContactForm.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

lazyImages.forEach(img => imageObserver.observe(img));

// Handle reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    } else {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fermer le menu en cliquant sur un lien
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
});

// Ajouter cette fonction pour gérer le redimensionnement
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const menuIcon = mobileMenuBtn.querySelector('i');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    }
});

// Assurer que les images de fond sont bien chargées
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const img = new Image();
        img.src = hero.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        img.onload = function() {
            hero.style.opacity = '1';
        };
    }
});

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const pageContactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Vérification du reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert('Veuillez compléter la vérification reCAPTCHA');
                return;
            }

            // Vérification de la case de confidentialité
            const privacyCheckbox = document.querySelector('input[name="privacy"]');
            if (!privacyCheckbox.checked) {
                alert('Veuillez accepter le traitement de vos données personnelles');
                return;
            }

            // Soumission du formulaire
            pageContactForm.submit();
            
            // Masquer le formulaire et afficher le message de remerciement
            pageContactForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
        });
    }
});

// Contact Form Toggle
const showContactFormBtn = document.getElementById('showContactForm');
const contactFormContainer = document.getElementById('contactFormContainer');

if (showContactFormBtn && contactFormContainer) {
    showContactFormBtn.addEventListener('click', () => {
        const isVisible = contactFormContainer.style.display === 'block';
        contactFormContainer.style.display = isVisible ? 'none' : 'block';
        showContactFormBtn.textContent = isVisible ? 'Nous contacter' : 'Fermer';
        
        if (!isVisible) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const formPosition = contactFormContainer.offsetTop - navbarHeight;
            contactFormContainer.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: formPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique d'envoi du formulaire
        alert('Message envoyé avec succès !');
        contactForm.reset();
        contactFormContainer.style.display = 'none';
        showContactFormBtn.textContent = 'Nous contacter';
    });
}

// Fonction pour ajuster le scroll en fonction de la hauteur de la navbar
function adjustScroll() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    // Ajuster le scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fonction pour ajuster le scroll vers le formulaire
function scrollToForm() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const form = document.querySelector('.contact-form');
    if (form) {
        const formPosition = form.offsetTop - navbarHeight;
        window.scrollTo({
            top: formPosition,
            behavior: 'smooth'
        });
    }
}

// Appeler les fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    adjustScroll();
    
    // Vérifier si on doit pré-remplir le formulaire
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('subject')) {
        prefillContactForm();
        scrollToForm();
    }
}); 