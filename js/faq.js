/**
 * ==========================================================================
 * MOTION DRIVE - FAQ ACCORDION INTERACTION
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
});

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            const body = item.querySelector('.accordion-body');

            // Close all other active items
            document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.accordion-body').style.maxHeight = null;
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                body.style.maxHeight = null;
            } else {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });
}
