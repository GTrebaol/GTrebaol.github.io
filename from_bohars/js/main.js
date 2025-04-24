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

// Contact Form Toggle
const showContactFormBtn = document.getElementById('showContactForm');
const contactFormContainer = document.getElementById('contactFormContainer');

if (showContactFormBtn && contactFormContainer) {
    showContactFormBtn.addEventListener('click', () => handleFormDisplay());
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

function handleFormDisplay() {
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
        initContactForm();
    }
};

// Gestion du formulaire de contact
function initContactForm(){
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validation du formulaire
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Désactiver le bouton pendant l'envoi
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            // Exécuter reCAPTCHA v3
            grecaptcha.enterprise.ready(async () => {
                try {
                    const token = await grecaptcha.enterprise.execute('6LcqoiMrAAAAAE1dpWIEDheFNVGkugVc4cc6a0Up', {action: 'contact'});
                    
                    // Récupérer les données du formulaire et les convertir en JSON
                    const formData = {
                        subject: contactForm.querySelector('input[name="subject"]').value,
                        name: contactForm.querySelector('input[name="name"]').value,
                        email: contactForm.querySelector('input[name="email"]').value,
                        phone: contactForm.querySelector('input[name="phone"]').value,
                        message: contactForm.querySelector('textarea[name="message"]').value,
                        privacy: contactForm.querySelector('input[name="privacy"]').checked,
                        'g-recaptcha-response': token
                    };

                    // Envoyer les données via AJAX
                    $.ajax({
                        url: "https://form-to-mail-api.onrender.com:3000/contact",
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(formData),
                        success: function(response) {
                            contactForm.style.display = 'none';
                            thankYouMessage.style.display = 'block';
                            contactForm.reset();
                            grecaptcha.enterprise.reset();
                        },
                        error: function(xhr, status, error) {
                            console.error('Erreur:', error);
                            if (xhr.responseJSON && xhr.responseJSON.error === 'reCAPTCHA failed') {
                                console.error('Erreur de vérification reCAPTCHA. Veuillez réessayer.');
                                grecaptcha.enterprise.reset();
                            } else {
                                console.error('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
                            }
                            submitButton.disabled = false;
                            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
                        }
                    });
                } catch (error) {
                    console.error('Erreur reCAPTCHA:', error);
                    console.error('Une erreur est survenue lors de la vérification. Veuillez réessayer.');
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
                }
            });
        });
    }
}

// Appeler les fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    adjustScroll();
    initContactForm();

    // Vérifier si on doit pré-remplir le formulaire
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('subject')) {
        prefillContactForm();
        scrollToForm();
    }
});

// Carrousel functionality
const modal = document.getElementById('carouselModal');
const modalContent = modal.querySelector('.modal-content');
const carouselImages = modal.querySelector('.carousel-images');
const carouselCaption = modal.querySelector('.carousel-caption');
const closeModal = modal.querySelector('.close-modal');
const prevButton = modal.querySelector('.carousel-button.prev');
const nextButton = modal.querySelector('.carousel-button.next');

let currentImageIndex = 0;
let images = [];

// Configuration des images par dossier
const imageConfig = {
    'plateau': {
        count: 13, // Nombre total d'images dans le dossier
        prefix: 'plateau-'
    },
    'buffet': {
        count: 3,
        prefix: 'buffet-'
    },
    'epicerie': {
        count: 3,
        prefix: 'epicerie-'
    },
    'cave': {
        count: 5,
        prefix: 'cave-'
    }
};

// Function to get a random image from a folder
function getRandomImage(folderName) {
    const config = imageConfig[folderName];
    if (!config) return null;
    
    const randomIndex = Math.floor(Math.random() * config.count) + 1;
    return `images/webp/${folderName}/${config.prefix}${randomIndex}.webp`;
}

// Function to load all images from a folder
function loadImages(folderName) {
    const config = imageConfig[folderName];
    if (!config) return [];
    
    const images = [];
    for (let i = 1; i <= config.count; i++) {
        images.push(`images/webp/${folderName}/${config.prefix}${i}.webp`);
    }
    return images;
}

// Update service card images with random images
document.querySelectorAll('.service-card').forEach(card => {
    const folderName = card.classList[1];
    if (folderName) {
        const randomImage = getRandomImage(folderName);
        if (randomImage) {
            const img = card.querySelector('img');
            img.src = randomImage;
        }
    }
});

// Function to show the carousel
function showCarousel(folderName) {
    images = loadImages(folderName);
    if (images.length === 0) return;

    currentImageIndex = 0;
    carouselImages.innerHTML = '';
    
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        if (index === 0) img.classList.add('active');
        carouselImages.appendChild(img);
    });

    updateCaption();
    modal.style.display = 'block';
    // Add show class after a small delay to trigger the animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
}

// Function to update the caption
function updateCaption() {
    carouselCaption.textContent = `${currentImageIndex + 1}/${images.length}`;
}

// Function to show next image
function showNextImage() {
    const currentImage = carouselImages.querySelector('.active');
    currentImage.classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    carouselImages.children[currentImageIndex].classList.add('active');
    updateCaption();
}

// Function to show previous image
function showPrevImage() {
    const currentImage = carouselImages.querySelector('.active');
    currentImage.classList.remove('active');
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    carouselImages.children[currentImageIndex].classList.add('active');
    updateCaption();
}

// Event listeners for carousel
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
});

prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});

// Add click event to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const folderName = card.classList[1]; // Assuming the folder name is the second class
        if (folderName) {
            showCarousel(folderName);
        }
    });
});

// Scroll to top when clicking on brand logo
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
    navBrand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} 