// Configuration
const CONFIG = {
    recaptcha: {
        siteKey: '6LcqoiMrAAAAAE1dpWIEDheFNVGkugVc4cc6a0Up',
        action: 'contact'
    },
    form: {
        url: 'https://form-to-mail-api.onrender.com/contact'
    }
};

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

// Gestion du menu mobile
function initMobileMenu() {
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
}

// Gestion du scroll
function initScroll() {
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

// Gestion de l'affichage du formulaire
function toggleFormVisibility(contactFormContainer, showContactFormBtn, keepVisible = false) {
    const isVisible = contactFormContainer.style.display === 'block';
    contactFormContainer.style.display = isVisible && !keepVisible? 'none' : 'block';
    showContactFormBtn.textContent = isVisible && !keepVisible? 'Nous contacter' : 'Fermer';
    
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
}

// Gestion de la soumission du formulaire
async function handleFormSubmit(event, contactForm, submitButton, thankYouMessage, contactFormContainer, showContactFormBtn) {
    event.preventDefault();
    
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    try {
        const token = await grecaptcha.enterprise.execute(CONFIG.recaptcha.siteKey, {action: CONFIG.recaptcha.action});
        
        const formData = {
            subject: contactForm.querySelector('input[name="subject"]').value,
            name: contactForm.querySelector('input[name="name"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            phone: contactForm.querySelector('input[name="phone"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value,
            privacy: contactForm.querySelector('input[name="privacy"]').checked,
            'g-recaptcha-response': token
        };

        const response = await $.ajax({
            url: CONFIG.form.url,
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(formData)
        });

        contactForm.style.display = 'none';
        thankYouMessage.style.display = 'block';
    } catch (error) {
        console.error('Erreur:', error);
        if (error.responseJSON && error.responseJSON.error === 'reCAPTCHA failed') {
            alert('Erreur de vérification reCAPTCHA. Veuillez réessayer.');
            grecaptcha.enterprise.reset();
        } else {
            alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
        }
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
    }
}

// Gestion du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const thankYouMessage = document.getElementById('thank-you-message');
    const showContactFormBtn = document.getElementById('showContactForm');
    const contactFormContainer = document.getElementById('contactFormContainer');

    if (!contactForm || !submitButton || !showContactFormBtn || !contactFormContainer) {
        console.error('Éléments du formulaire non trouvés');
        return;
    }

    // Événements
    showContactFormBtn.addEventListener('click', () => toggleFormVisibility(contactFormContainer, showContactFormBtn));
    submitButton.addEventListener('click', (event) => handleFormSubmit(
        event, 
        contactForm, 
        submitButton, 
        thankYouMessage, 
        contactFormContainer, 
        showContactFormBtn
    ));
}

// Gestion du carrousel
function initCarousel() {
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
        'plateau': { count: 13, prefix: 'plateau-' },
        'buffet': { count: 3, prefix: 'buffet-' },
        'epicerie': { count: 3, prefix: 'epicerie-' },
        'cave': { count: 5, prefix: 'cave-' }
    };

    // Fonctions utilitaires
    function getRandomImage(folderName) {
        const config = imageConfig[folderName];
        if (!config) return null;
        const randomIndex = Math.floor(Math.random() * config.count) + 1;
        return `images/webp/${folderName}/${config.prefix}${randomIndex}.webp`;
    }

    function loadImages(folderName) {
        const config = imageConfig[folderName];
        if (!config) return [];
        return Array.from({length: config.count}, (_, i) => 
            `images/webp/${folderName}/${config.prefix}${i + 1}.webp`
        );
    }

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
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }

    function updateCaption() {
        carouselCaption.textContent = `${currentImageIndex + 1}/${images.length}`;
    }

    function showNextImage() {
        const currentImage = carouselImages.querySelector('.active');
        currentImage.classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        carouselImages.children[currentImageIndex].classList.add('active');
        updateCaption();
    }

    function showPrevImage() {
        const currentImage = carouselImages.querySelector('.active');
        currentImage.classList.remove('active');
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        carouselImages.children[currentImageIndex].classList.add('active');
        updateCaption();
    }

    // Événements
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    });

    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

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

    // Initialisation des images aléatoires
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

    // Ajout des événements de clic sur les cartes
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const folderName = card.classList[1];
            if (folderName) {
                showCarousel(folderName);
            }
        });
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScroll();
    initContactForm();
    initCarousel();

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