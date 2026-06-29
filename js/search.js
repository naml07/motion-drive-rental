/**
 * ==========================================================================
 * MOTION DRIVE - VEHICLE SEARCH ENGINE
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initSearchEngine();
});

function initSearchEngine() {
    const searchForm = document.querySelector('.search-form');
    const pickupDateInput = document.getElementById('pickup-date');
    const returnDateInput = document.getElementById('return-date');

    // Set default dates
    if (pickupDateInput && returnDateInput) {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 3);

        pickupDateInput.value = formatDate(today);
        returnDateInput.value = formatDate(nextWeek);

        // Ensure return date is always after pickup date
        pickupDateInput.addEventListener('change', () => {
            if (new Date(returnDateInput.value) <= new Date(pickupDateInput.value)) {
                const newReturn = new Date(pickupDateInput.value);
                newReturn.setDate(newReturn.getDate() + 2);
                returnDateInput.value = formatDate(newReturn);
            }
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const pickupLoc = document.getElementById('pickup-loc')?.value || 'Abidjan';
            const category = document.getElementById('vehicle-category')?.value || 'all';
            
            // Visual feedback before redirection
            const submitBtn = searchForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Recherche en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                window.location.href = `flotte.html?category=${encodeURIComponent(category)}&location=${encodeURIComponent(pickupLoc)}`;
            }, 600);
        });
    }
}

function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
