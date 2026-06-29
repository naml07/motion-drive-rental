/**
 * ==========================================================================
 * MOTION DRIVE - CORE JAVASCRIPT
 * Flagship Digital Experience
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initUniversalBookingModal();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile menu toggle with full screen overlay
 */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isActive = mobileMenu.classList.contains('active');
        
        // Animate hamburger icon
        const spans = toggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking link
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Universal Booking Modal System (Works across all pages)
 */
function initUniversalBookingModal() {
    let modal = document.getElementById('booking-modal');
    if (!modal) {
        const modalHtml = `
        <div id="booking-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
            <div class="modal-content booking-modal-content">
                <button class="close-modal close-booking-modal" aria-label="Fermer la fenêtre">&times;</button>
                
                <div class="booking-modal-header">
                    <span class="badge" style="background: var(--color-copper); color: white; margin-bottom: 8px;">Réservation Express VIP</span>
                    <h2 id="booking-modal-title" style="font-size: var(--text-2xl); margin-bottom: 4px;">Demande de Mise à Disposition</h2>
                    <div class="selected-car-recap">
                        <span id="recap-car-name" style="font-weight: 800; font-size: var(--text-lg); color: var(--color-graphite);">Véhicule de Prestige</span>
                        <span id="recap-car-price" class="recap-price" style="font-weight: 700; color: var(--color-copper);">Sur demande</span>
                    </div>
                </div>

                <form id="booking-modal-form" class="booking-form" style="margin-top: var(--space-lg);">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div class="form-group">
                            <label for="book-fullname" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Nom & Prénom <span style="color:red;">*</span></label>
                            <input type="text" id="book-fullname" class="form-control" placeholder="Ex: S.E.M. Kouassi Jean" required style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white);">
                        </div>
                        <div class="form-group">
                            <label for="book-whatsapp" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Numéro WhatsApp <span style="color:red;">*</span></label>
                            <input type="tel" id="book-whatsapp" class="form-control" placeholder="Ex: +225 07 00 00 00 00" required style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white);">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div class="form-group">
                            <label for="book-country" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Pays d'intervention</label>
                            <select id="book-country" class="form-control" style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white);">
                                <option value="Côte d'Ivoire">Côte d'Ivoire (Abidjan / Assinie)</option>
                                <option value="Sénégal">Sénégal (Dakar / Saly)</option>
                                <option value="Togo">Togo (Lomé)</option>
                                <option value="Autre région">Autre région Ouest-Africaine</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="book-city" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Ville <span style="color:red;">*</span></label>
                            <input type="text" id="book-city" class="form-control" placeholder="Ex: Abidjan" required style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white);">
                        </div>
                        <div class="form-group">
                            <label for="book-district" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Quartier / Lieu exact <span style="color:red;">*</span></label>
                            <input type="text" id="book-district" class="form-control" placeholder="Ex: Cocody Ambassades" required style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white);">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                        <div class="form-group">
                            <label for="book-start-date" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Date & Heure Prise en charge <span style="color:red;">*</span></label>
                            <input type="datetime-local" id="book-start-date" class="form-control" required style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white);">
                        </div>
                        <div class="form-group">
                            <label for="book-end-date" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Date & Heure Restitution <span style="color:red;">*</span></label>
                            <input type="datetime-local" id="book-end-date" class="form-control" required style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white);">
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 20px; background: rgba(184, 115, 51, 0.06); padding: 16px; border-radius: 8px; border: 1px solid rgba(184, 115, 51, 0.2);">
                        <label style="display:block; font-size:var(--text-xs); font-weight:800; color:var(--color-copper); margin-bottom:10px; text-transform:uppercase;">✨ Options Exécutives Incluses / Sélectionnables</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: var(--text-xs); font-weight: 600;">
                            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" checked disabled> 👔 Chauffeur Privé Bilingue VIP</label>
                            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="opt-escort"> 🛬 Accueil Salon VIP & Escorte Aéroport</label>
                            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="opt-armor"> 🛡️ Option Blindage B6/VR7</label>
                            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="opt-wifi" checked> 📶 Wi-Fi 5G & Rafraîchissements Prestige</label>
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 24px;">
                        <label for="book-notes" style="display:block; font-size:var(--text-xs); font-weight:700; margin-bottom:6px;">Exigences particulières ou protocole de sécurité</label>
                        <textarea id="book-notes" class="form-control" rows="3" placeholder="Précisez vos besoins : cortège officiel, itinéraire spécifique, préférences de rafraîchissements..." style="width:100%; padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.15); background:var(--color-warm-white); font-family:inherit;"></textarea>
                    </div>

                    <button type="submit" class="btn btn-copper" style="width: 100%; min-height: 52px; font-size: var(--text-base); font-weight: 700; box-shadow: 0 10px 25px rgba(184, 115, 51, 0.3);">💬 Transmettre la Réservation VIP via WhatsApp</button>
                    <p style="text-align:center; font-size: 11px; color: var(--color-stone); margin-top: 12px;">🔒 Vos données sont traitées selon le plus strict protocole de confidentialité diplomatique de Motion Drive.</p>
                </form>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('booking-modal');
    }

    const closeBtns = document.querySelectorAll('.close-booking-modal');
    const form = document.getElementById('booking-modal-form');
    const recapName = document.getElementById('recap-car-name');
    const recapPrice = document.getElementById('recap-car-price');

    const openModal = (carName, carPrice) => {
        if (recapName) recapName.textContent = carName || 'Sélection Prestige';
        if (recapPrice) recapPrice.textContent = carPrice || 'Tarif sur demande';
        
        const now = new Date();
        const startInput = document.getElementById('book-start-date');
        const endInput = document.getElementById('book-end-date');
        if (startInput && !startInput.value) {
            const tomorrow = new Date(now.getTime() + 24*60*60*1000);
            tomorrow.setMinutes(0);
            const pad = n => n < 10 ? '0'+n : n;
            startInput.value = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth()+1)}-${pad(tomorrow.getDate())}T${pad(tomorrow.getHours())}:00`;
        }
        if (endInput && !endInput.value) {
            const afterTomorrow = new Date(now.getTime() + 4*24*60*60*1000);
            afterTomorrow.setMinutes(0);
            const pad = n => n < 10 ? '0'+n : n;
            endInput.value = `${afterTomorrow.getFullYear()}-${pad(afterTomorrow.getMonth()+1)}-${pad(afterTomorrow.getDate())}T${pad(afterTomorrow.getHours())}:00`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Intercept clicks universally across any page
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Don't open popup when clicking checkboxes or compare toggles
        if (target.closest('.compare-toggle') || target.closest('input[type="checkbox"]') || target.closest('select')) {
            return;
        }

        // Check if clicked element is a reserve button or link
        const btn = target.closest('.btn-book-modal') || target.closest('a[href*="catalogue.html"], a[href*="flotte.html"]') || target.closest('button, .btn');
        const card = target.closest('.clickable-card, .fleet-card, .mag-card');

        // If clicking navigation menu links, let them navigate naturally unless it's a booking CTA
        if (btn && btn.classList.contains('nav-link') && !btn.textContent.toLowerCase().includes('réserver')) {
            return;
        }
        if (btn && btn.classList.contains('mobile-nav-link') && !btn.textContent.toLowerCase().includes('réserver')) {
            return;
        }

        // If clicking a "Réserver" button or link
        if (btn && (btn.textContent.toLowerCase().includes('réserver') || btn.classList.contains('btn-book-modal') || btn.getAttribute('href')?.includes('catalogue.html'))) {
            e.preventDefault();
            e.stopPropagation();
            const carName = btn.getAttribute('data-name') || card?.getAttribute('data-name') || card?.querySelector('h3')?.textContent || 'Véhicule Exécutif Motion Drive';
            const carPrice = btn.getAttribute('data-price') || card?.getAttribute('data-price') || card?.querySelector('.text-xl, .text-2xl')?.textContent?.split('/')[0]?.trim() || 'Tarif Corporate';
            openModal(carName, carPrice);
            return;
        }

        // If clicking anywhere on a car card
        if (card) {
            e.preventDefault();
            const carName = card.getAttribute('data-name') || card.querySelector('h3')?.textContent || 'Véhicule de Prestige';
            const carPrice = card.getAttribute('data-price') || card.querySelector('.text-xl, .text-2xl')?.textContent?.split('/')[0]?.trim() || 'Tarif Corporate';
            openModal(carName, carPrice);
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('book-fullname')?.value || '';
            const whatsapp = document.getElementById('book-whatsapp')?.value || '';
            const country = document.getElementById('book-country')?.value || '';
            const city = document.getElementById('book-city')?.value || '';
            const district = document.getElementById('book-district')?.value || '';
            const startDate = document.getElementById('book-start-date')?.value || '';
            const endDate = document.getElementById('book-end-date')?.value || '';
            const notes = document.getElementById('book-notes')?.value || '';
            
            const escort = document.getElementById('opt-escort')?.checked ? 'Oui' : 'Non';
            const armor = document.getElementById('opt-armor')?.checked ? 'Oui (B6/VR7)' : 'Non';
            const carName = recapName?.textContent || 'Véhicule Exécutif';

            const message = `🌟 *DEMANDE DE RÉSERVATION VIP - MOTION DRIVE* 🌟\n\n` +
                `🚘 *Véhicule* : ${carName}\n` +
                `👤 *Client* : ${fullname}\n` +
                `📱 *WhatsApp* : ${whatsapp}\n` +
                `📍 *Lieu* : ${city}, ${district} (${country})\n` +
                `📅 *Prise en charge* : ${startDate.replace('T', ' à ')}\n` +
                `🏁 *Restitution* : ${endDate.replace('T', ' à ')}\n\n` +
                `🛡️ *Options Exécutives* :\n` +
                `• Chauffeur Privé Bilingue : Inclus\n` +
                `• Accueil Salon VIP & Escorte : ${escort}\n` +
                `• Option Blindage B6/VR7 : ${armor}\n\n` +
                `📝 *Protocole / Notes* : ${notes ? notes : 'Aucune exigence particulière'}\n\n` +
                `_Message transmis via le portail officiel Motion Drive Africa._`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/2250700000000?text=${encodedMessage}`;
            
            closeModal();
            window.open(whatsappUrl, '_blank');
        });
    }
}
