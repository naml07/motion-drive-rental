/**
 * ==========================================================================
 * MOTION DRIVE - FLEET FILTERS & COMPARISON SYSTEM
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initComparison();
    parseUrlParams();
});

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const transSelect = document.getElementById('filter-trans');
    const sortSelect = document.getElementById('sort-price');
    const cards = document.querySelectorAll('.mag-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            applyFilters(category, transSelect ? transSelect.value : 'all');
        });
    });

    if (transSelect) {
        transSelect.addEventListener('change', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
            applyFilters(category, transSelect.value);
        });
    }
}

function applyFilters(category, transmission) {
    const cards = document.querySelectorAll('.mag-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const cardTrans = card.getAttribute('data-transmission');
        
        const matchCat = (category === 'all' || cardCat === category);
        const matchTrans = (transmission === 'all' || cardTrans === transmission);

        if (matchCat && matchTrans) {
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
    if (category) {
        const btn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (btn) {
            btn.click();
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
            <td style="padding: 16px;"><a href="contact.html?subject=${encodeURIComponent(v1.name)}" class="btn btn-primary" style="width: 100%;">Réserver ${v1.name}</a></td>
            <td style="padding: 16px;"><a href="contact.html?subject=${encodeURIComponent(v2.name)}" class="btn btn-primary" style="width: 100%;">Réserver ${v2.name}</a></td>
        </tr>
    `;
}
