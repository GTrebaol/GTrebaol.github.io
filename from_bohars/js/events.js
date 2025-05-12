// URL du calendrier public avec proxy CORS
const CALENDAR_URL = 'https://corsproxy.io/?url=' + encodeURIComponent('https://calendar.google.com/calendar/ical/ab162583017a7f2d09eb9e93111b20cb6e946547f94687be7e66993ce2605548%40group.calendar.google.com/public/basic.ics');

// Fonction pour formater la date
function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour extraire le prix d'une description
function extractPrice(description) {
    if (!description) return null;
    
    // Recherche de motifs comme "X€", "XX €", "0 €", etc.
    const priceMatch = description.match(/(\d+)\s*€/);
    if (priceMatch) {
        return parseInt(priceMatch[1]);
    }
    return null;
}

// Fonction pour nettoyer la description en enlevant le prix
function cleanDescription(description) {
    if (!description) return '';
    // Enlever le prix de la description
    return description.replace(/(\d+)\s*€/g, '').trim();
}

// Fonction pour récupérer les événements
async function fetchEvents() {
    try {
        const response = await fetch(CALENDAR_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const icsData = await response.text();
        const jcalData = ICAL.parse(icsData);
        const comp = new ICAL.Component(jcalData);
        const events = comp.getAllSubcomponents('vevent');
        
        return events.map(event => {
            const icalEvent = new ICAL.Event(event);
            return {
                summary: icalEvent.summary,
                description: icalEvent.description,
                start: {
                    dateTime: icalEvent.startDate.toJSDate().toISOString()
                },
                location: icalEvent.location
            };
        }).filter(event => {
            // Ne garder que les événements futurs
            return new Date(event.start.dateTime) > new Date();
        }).sort((a, b) => {
            // Trier par date
            return new Date(a.start.dateTime) - new Date(b.start.dateTime);
        }).slice(0, 10); // Limiter à 10 événements
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        displayError('Impossible de charger les événements. Veuillez réessayer plus tard.');
        return [];
    }
}

// Fonction pour afficher un message d'erreur
function displayError(message) {
    const eventsList = document.getElementById('evenementsList');
    eventsList.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <p>Pour tester en local, utilisez la commande :</p>
            <code>serve</code>
        </div>
    `;
}

// Fonction pour afficher les événements
function displayEvents(events) {
    const eventsList = document.getElementById('evenementsList');
    eventsList.innerHTML = '';

    if (events.length === 0) {
        eventsList.innerHTML = '<p>Aucun événement à venir pour le moment.</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'evenement-card';
        
        // Vérifier si l'adresse est renseignée et différente de celle de la fromagerie
        const locationInfo = event.location && 
            !event.location.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes('29200 bohars') && 
            !event.location.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes('prosper salaun')
            ? `<p class="event-location">${event.location}</p>`
            : '';


        eventCard.innerHTML = `
            <h3>${event.summary}</h3>
            <p>${formatDate(event.start.dateTime)}</p>
            ${locationInfo}
            <p>${event.description}</p>
            <button class="cta-button reserve-button" 
                    data-event-title="${event.summary}"
                    data-event-date="${formatDate(event.start.dateTime)}">
                Réserver
            </button>
        `;
        eventsList.appendChild(eventCard);
    });

    // Ajouter les écouteurs d'événements aux boutons de réservation
    document.querySelectorAll('.reserve-button').forEach(button => {
        button.addEventListener('click', () => {
            const eventTitle = button.dataset.eventTitle;
            const eventDate = button.dataset.eventDate;
            prefillContactForm(eventTitle, eventDate);
        });
    });
}

// Fonction pour pré-remplir le formulaire de contact
function prefillContactForm(eventTitle, eventDate) {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const messageField = contactForm.querySelector('textarea[name="message"]');
        if (messageField) {
            messageField.value = `Bonjour, je souhaite participer à "${eventTitle}" du ${eventDate}.`;
            
            const showContactFormBtn = document.getElementById('showContactForm');
            const contactFormContainer = document.getElementById('contactFormContainer');
            toggleFormVisibility(contactFormContainer, showContactFormBtn, true);
        }
    }
}

// Fonction pour vérifier si un élément existe dans le DOM
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// Fonction pour initialiser les événements
async function initEvents() {
    // Vérifier que l'élément existe
    if (!elementExists('#evenementsList')) {
        console.error('Élément evenementsList non trouvé');
        return;
    }

    try {
        console.log('Début du chargement des événements');
        const events = await fetchEvents();
        
        // Attendre 500ms après le chargement des événements
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier à nouveau que l'élément existe avant d'afficher
        if (!elementExists('#evenementsList')) {
            console.error('Élément evenementsList non trouvé avant affichage');
            return;
        }
        
        displayEvents(events);
        console.log('Événements affichés avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
    }
}

// Attendre que la page soit complètement chargée
if (document.readyState === 'loading') {
    window.addEventListener('load', () => {
        // Attendre 500ms après le chargement complet
        setTimeout(initEvents, 500);
    });
} else {
    // Si le document est déjà chargé, attendre quand même 500ms
    setTimeout(initEvents, 500);
}