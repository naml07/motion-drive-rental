/**
 * ==========================================================================
 * MOTION DRIVE - ANIMATIONS & SCROLL REVEAL
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounters();
});

/**
 * Intersection Observer for scroll animations
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    if (!reveals.length || !('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('active'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}

/**
 * Animated number counters in trust bar
 */
function initCounters() {
    const counters = document.querySelectorAll('.trust-number[data-target]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const suffix = counter.getAttribute('data-suffix') || '';
                const prefix = counter.getAttribute('data-prefix') || '';
                
                animateValue(counter, 0, target, 2000, prefix, suffix);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateValue(obj, start, end, duration, prefix, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeProgress * (end - start) + start);
        
        obj.innerHTML = `${prefix}${current}<span>${suffix}</span>`;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = `${prefix}${end}<span>${suffix}</span>`;
        }
    };
    window.requestAnimationFrame(step);
}
