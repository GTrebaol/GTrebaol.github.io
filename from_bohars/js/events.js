// URL du calendrier public avec proxy CORS
const CALENDAR_URL = 'https://corsproxy.io/?url=' + encodeURIComponent('https://calendar.google.com/calendar/ical/1ea22aa0f502c8b413ec4d998886ddabaccd5f163951d6ae17e85765b4af7165%40group.calendar.google.com/public/basic.ics');

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

    const fromagerieAddress = '23 Rue Prosper Salaün, 29820 Bohars';

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
            <p>${event.description || ''}</p>
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
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const messageField = contactForm.querySelector('textarea[name="message"]');
        if (messageField) {
            messageField.value = `Bonjour, je souhaite participer à "${eventTitle}" du ${eventDate}.`;
            // Afficher le formulaire si nécessaire
            const contactFormContainer = document.getElementById('contactFormContainer');
            if (contactFormContainer) {
                contactFormContainer.style.display = 'block';
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const formPosition = contactFormContainer.offsetTop - navbarHeight;
                window.scrollTo({
                    top: formPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// Charger les événements au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    const events = await fetchEvents();
    displayEvents(events);
}); 