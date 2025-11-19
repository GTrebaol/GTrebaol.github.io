document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    // Gestion du scroll pour la navbar (masquer/afficher au scroll) - SUPPRIMÉ pour garder la navbar sticky
    // if (navbar) { ... }

    // Gestion du menu mobile
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) { // Vérifie si les deux éléments existent
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.classList.toggle('active'); // Pour animer le bouton si besoin (ex: croix)
        });

        // Optionnel: Fermer le menu si on clique sur un lien (pour les SPA ou liens internes)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuButton.classList.remove('active');
                }
            });
        });
    }
});

// --- Category -> Shoe grid linking ---
(function () {
    const CATEGORY_KEYS = [
        'premiers-pas',
        'junior',
        'ado',
    ];

    const displaySection = document.getElementById('display');
    if (!displaySection) return;
    const shoeGrid = displaySection.querySelector('.shoe-grid');
    if (!shoeGrid) return;

    const manifestUrl = 'assets/images/chaussures/manifest.json';
    let manifestCache = null;
    let currentActiveCategory = null;

    async function loadManifest() {
        if (manifestCache) return manifestCache;
        // Prefer global when available (file:// fallback)
        if (typeof window !== 'undefined' && window.SHOE_MANIFEST) {
            manifestCache = window.SHOE_MANIFEST;
            return manifestCache;
        }
        try {
            const res = await fetch(manifestUrl, { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            manifestCache = data;
            return data;
        } catch (e) {
            console.warn('Manifest indisponible via HTTP, tentative fallback global:', e);
            if (typeof window !== 'undefined' && window.SHOE_MANIFEST) {
                manifestCache = window.SHOE_MANIFEST;
                return manifestCache;
            }
            return null;
        }
    }

    function setActiveCategoryCard(categoryKey) {
        currentActiveCategory = categoryKey;
        document.querySelectorAll('.category-card[data-category]').forEach((el) => {
            const isActive = el.getAttribute('data-category') === categoryKey;
            if (isActive) {
                el.classList.add('active');
                el.setAttribute('aria-current', 'true');
            } else {
                el.classList.remove('active');
                el.removeAttribute('aria-current');
            }
        });
    }

    function setGridLoading(categoryKey) {
        shoeGrid.innerHTML = '';
        const loading = document.createElement('div');
        loading.className = 'shoe-card';
        loading.innerHTML = '<div class="shoe-card-image-container"></div><div class="shoe-card-info"><div class="shoe-card-name">Chargement…</div><div class="shoe-card-description">' + (categoryKey ? 'Catégorie: ' + categoryKey : '') + '</div></div>';
        shoeGrid.appendChild(loading);
    }

    function renderStaticImages(categoryKey, fileNames) {
        shoeGrid.innerHTML = '';
        if (!fileNames || fileNames.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'shoe-card';
            empty.innerHTML = '<div class="shoe-card-info"><div class="shoe-card-name">Aucune image</div><div class="shoe-card-description">Ajoutez des fichiers dans assets/images/chaussures/' + categoryKey + '</div></div>';
            shoeGrid.appendChild(empty);
            return;
        }
        fileNames.forEach((file) => {
            const card = document.createElement('div');
            card.className = 'shoe-card';

            const imgWrap = document.createElement('div');
            imgWrap.className = 'shoe-card-image-container';

            const img = document.createElement('img');
            img.alt = 'Chaussure ' + categoryKey + ' - ' + file;
            img.loading = 'lazy';
            img.src = 'assets/images/chaussures/' + categoryKey + '/' + file;
            imgWrap.appendChild(img);

            card.appendChild(imgWrap);
            shoeGrid.appendChild(card);
        });
    }

    function renderCarousel(categoryKey, fileNames) {
        const PAGE_SIZE = 2;
        let currentPage = 0;
        const totalPages = Math.ceil(fileNames.length / PAGE_SIZE);

        shoeGrid.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'shoe-carousel';

        const viewport = document.createElement('div');
        viewport.className = 'shoe-carousel-viewport';

        const track = document.createElement('div');
        track.className = 'shoe-carousel-track';
        viewport.appendChild(track);

        // Create all pages
        for (let i = 0; i < totalPages; i++) {
            const page = document.createElement('div');
            page.className = 'shoe-carousel-page';

            const start = i * PAGE_SIZE;
            const end = Math.min(start + PAGE_SIZE, fileNames.length);

            for (let idx = start; idx < end; idx++) {
                const file = fileNames[idx];
                const card = document.createElement('div');
                card.className = 'shoe-card';

                const imgWrap = document.createElement('div');
                imgWrap.className = 'shoe-card-image-container';

                const img = document.createElement('img');
                img.alt = 'Chaussure ' + categoryKey + ' - ' + file;
                img.loading = 'lazy';
                img.src = 'assets/images/chaussures/' + categoryKey + '/' + file;

                imgWrap.appendChild(img);
                card.appendChild(imgWrap);
                page.appendChild(card);
            }
            track.appendChild(page);
        }

        container.appendChild(viewport);
        shoeGrid.appendChild(container);

        let prevBtn, nextBtn, indicators;
        if (totalPages > 1) {
            prevBtn = document.createElement('button');
            prevBtn.className = 'shoe-carousel-btn prev';
            prevBtn.type = 'button';
            prevBtn.setAttribute('aria-label', 'Précédent');
            prevBtn.textContent = '‹';

            nextBtn = document.createElement('button');
            nextBtn.className = 'shoe-carousel-btn next';
            nextBtn.type = 'button';
            nextBtn.setAttribute('aria-label', 'Suivant');
            nextBtn.textContent = '›';

            indicators = document.createElement('div');
            indicators.className = 'shoe-carousel-indicators';

            container.appendChild(prevBtn);
            container.appendChild(nextBtn);
            container.appendChild(indicators);
        }

        function updateCarousel() {
            const translateX = -(currentPage * 100);
            track.style.transform = 'translateX(' + translateX + '%)';

            if (indicators) {
                Array.from(indicators.children).forEach((dot, index) => {
                    if (index === currentPage) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            }
        }

        function createIndicators() {
            if (!indicators) return;
            indicators.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'shoe-carousel-dot' + (i === currentPage ? ' active' : '');
                dot.setAttribute('aria-label', 'Aller à la page ' + (i + 1));
                dot.addEventListener('click', () => {
                    currentPage = i;
                    updateCarousel();
                });
                indicators.appendChild(dot);
            }
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentPage = (currentPage - 1 + totalPages) % totalPages;
                updateCarousel();
            });
            nextBtn.addEventListener('click', () => {
                currentPage = (currentPage + 1) % totalPages;
                updateCarousel();
            });
        }

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) {
                // Swipe Left -> Next
                currentPage = (currentPage + 1) % totalPages;
                updateCarousel();
            }
            if (touchEndX > touchStartX + threshold) {
                // Swipe Right -> Prev
                currentPage = (currentPage - 1 + totalPages) % totalPages;
                updateCarousel();
            }
        }

        createIndicators();
        updateCarousel();
    }

    function renderImages(categoryKey, fileNames) {
        if (!fileNames || fileNames.length === 0) {
            renderStaticImages(categoryKey, fileNames);
            return;
        }
        if (fileNames.length > 2) {
            renderCarousel(categoryKey, fileNames);
        } else {
            renderStaticImages(categoryKey, fileNames);
        }
    }

    // note: carousel centering removed at user's request

    async function onCategorySelected(categoryKey) {
        if (!CATEGORY_KEYS.includes(categoryKey)) return;
        setActiveCategoryCard(categoryKey);
        setGridLoading(categoryKey);
        const data = await loadManifest();
        if (!data || !data[categoryKey]) {
            renderImages(categoryKey, []);
            return;
        }
        renderImages(categoryKey, data[categoryKey]);
    }

    function bindCard(el) {
        const key = el.getAttribute('data-category');
        if (!key) return;
        el.addEventListener('click', () => onCategorySelected(key));
        el.addEventListener('keydown', (evt) => {
            if (evt.key === 'Enter' || evt.key === ' ') {
                evt.preventDefault();
                onCategorySelected(key);
            }
        });
    }

    function delegateCategoryEvents() {
        const container = document.querySelector('.categories-grid');
        if (!container) return;
        container.addEventListener('click', (e) => {
            const el = e.target.closest('.category-card[data-category]');
            if (!el || !container.contains(el)) return;
            const key = el.getAttribute('data-category');
            onCategorySelected(key);
        });
        container.addEventListener('keydown', (e) => {
            const el = e.target.closest('.category-card[data-category]');
            if (!el || !container.contains(el)) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const key = el.getAttribute('data-category');
                onCategorySelected(key);
            }
        });
    }

    document.querySelectorAll('.category-card[data-category]').forEach(bindCard);
    delegateCategoryEvents();

    // Default load: premiers-pas (no carousel centering)
    onCategorySelected('premiers-pas');
})();
