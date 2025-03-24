// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Form submission handling
const form = document.querySelector('form');
const submitButton = form.querySelector('.submit-button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            form.reset();
            setTimeout(() => {
                submitButton.innerHTML = 'Envoyer';
            }, 3000);
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erreur';
        setTimeout(() => {
            submitButton.innerHTML = 'Envoyer';
        }, 3000);
    } finally {
        submitButton.disabled = false;
    }
}); 