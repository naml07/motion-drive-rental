/**
 * ==========================================================================
 * MOTION DRIVE - CATALOGUE FILTERING & SEARCH SYSTEM
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initCategoryFilters();
});

function initCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vehicleCards = document.querySelectorAll('.item-card');
    const searchInput = document.getElementById('vehicle-search');

    if (!vehicleCards.length) return;

    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activeBtn = document.querySelector('.filter-btn.active');
        const filterValue = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

        vehicleCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const title = card.querySelector('.item-card__title').textContent.toLowerCase();
            const categoryText = card.querySelector('.item-card__category').textContent.toLowerCase();
            
            const matchesCategory = filterValue === 'all' || cardCategory === filterValue;
            const matchesSearch = title.includes(query) || categoryText.includes(query);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    }

    if (filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                applyFilters();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Initial styling for transition
    vehicleCards.forEach(card => {
        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    });
}
