/**
 * ==========================================================================
 * MOTION DRIVE - FLEET FILTERS & COMPARISON SYSTEM
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initComparison();
    parseUrlParams();
    initMobileToggle();
});

function initMobileToggle() {
    const toggleBtn = document.getElementById('mobile-filter-toggle');
    const filtersContent = document.getElementById('filters-content');
    const toggleIcon = document.getElementById('filter-toggle-icon');

    if (toggleBtn && filtersContent) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = filtersContent.classList.toggle('open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            if (toggleIcon) {
                toggleIcon.textContent = isOpen ? '▲' : '▼';
            }
        });
    }
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const transSelect = document.getElementById('filter-trans');
    const searchInput = document.getElementById('fleet-search-input');

    if (!filterBtns.length) return;

    const triggerFiltering = () => {
        const activeBtn = document.querySelector('.filter-btn.active');
        const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        const trans = transSelect ? transSelect.value : 'all';
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        applyFilters(category, trans, query);
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            triggerFiltering();
        });
    });

    if (transSelect) {
        transSelect.addEventListener('change', triggerFiltering);
    }

    if (searchInput) {
        searchInput.addEventListener('input', triggerFiltering);
    }
}

function applyFilters(category, transmission, searchQuery = '') {
    const cards = document.querySelectorAll('.mag-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const cardTrans = card.getAttribute('data-transmission');
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
        const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
        
        const matchCat = (category === 'all' || cardCat === category);
        const matchTrans = (transmission === 'all' || cardTrans === transmission);
        const matchQuery = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

        if (matchCat && matchTrans && matchQuery) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const location = urlParams.get('location');
    const searchInput = document.getElementById('fleet-search-input');

    if (category && category !== 'all') {
        const btn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (btn) {
            btn.click();
        }
    }

    if (location && location !== 'all') {
        if (location === 'mercedes' || location === 'rangerover') {
            if (searchInput) {
                searchInput.value = location === 'mercedes' ? 'mercedes' : 'range rover';
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    }
}

/**
 * Vehicle Comparison System
 */
let comparedVehicles = [];

function initComparison() {
    const checkboxes = document.querySelectorAll('.compare-checkbox');
    const compareBar = document.getElementById('compare-bar');
    const countEl = document.getElementById('compare-count');
    const namesEl = document.getElementById('compare-names');
    const openBtn = document.getElementById('open-compare-modal');
    const modal = document.getElementById('compare-modal');
    const closeBtn = document.querySelector('.close-modal');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const name = cb.getAttribute('data-name');
            const price = cb.getAttribute('data-price');
            const motor = cb.getAttribute('data-motor');
            const places = cb.getAttribute('data-places');

            if (cb.checked) {
                if (comparedVehicles.length >= 2) {
                    alert("Vous pouvez comparer un maximum de 2 véhicules simultanément.");
                    cb.checked = false;
                    return;
                }
                comparedVehicles.push({ name, price, motor, places });
            } else {
                comparedVehicles = comparedVehicles.filter(v => v.name !== name);
            }

            updateCompareBar();
        });
    });

    function updateCompareBar() {
        if (!compareBar) return;
        if (comparedVehicles.length > 0) {
            compareBar.classList.add('active');
            if (countEl) countEl.innerText = comparedVehicles.length;
            if (namesEl) namesEl.innerHTML = comparedVehicles.map(v => `<span class="compare-chip">${v.name}</span>`).join('');
        } else {
            compareBar.classList.remove('active');
        }
    }

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            if (comparedVehicles.length < 2) {
                alert("Veuillez sélectionner 2 véhicules pour lancer le comparatif.");
                return;
            }
            renderComparisonModal();
            modal.classList.add('active');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
}

function renderComparisonModal() {
    const tableBody = document.getElementById('compare-table-body');
    if (!tableBody || comparedVehicles.length < 2) return;

    const v1 = comparedVehicles[0];
    const v2 = comparedVehicles[1];

    tableBody.innerHTML = `
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
            <th style="padding: 16px; text-align: left; color: var(--color-stone);">Modèle</th>
            <td style="padding: 16px; font-weight: 700; font-size: var(--text-lg);">${v1.name}</td>
            <td style="padding: 16px; font-weight: 700; font-size: var(--text-lg);">${v2.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
            <th style="padding: 16px; text-align: left; color: var(--color-stone);">Tarif Journalier</th>
            <td style="padding: 16px; color: var(--color-copper); font-weight: 700;">${v1.price} FCFA</td>
            <td style="padding: 16px; color: var(--color-copper); font-weight: 700;">${v2.price} FCFA</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
            <th style="padding: 16px; text-align: left; color: var(--color-stone);">Motorisation</th>
            <td style="padding: 16px;">${v1.motor}</td>
            <td style="padding: 16px;">${v2.motor}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
            <th style="padding: 16px; text-align: left; color: var(--color-stone);">Capacité</th>
            <td style="padding: 16px;">${v1.places} places confort</td>
            <td style="padding: 16px;">${v2.places} places confort</td>
        </tr>
        <tr>
            <th style="padding: 16px;"></th>
            <td style="padding: 16px;"><button type="button" class="btn btn-primary btn-book-modal" data-name="${v1.name}" data-price="${v1.price} FCFA" style="width: 100%;">Réserver ${v1.name}</button></td>
            <td style="padding: 16px;"><button type="button" class="btn btn-primary btn-book-modal" data-name="${v2.name}" data-price="${v2.price} FCFA" style="width: 100%;">Réserver ${v2.name}</button></td>
        </tr>
    `;
}

