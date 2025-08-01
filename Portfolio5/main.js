// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation pour le toggle
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Smooth scrolling pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Hauteur de la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer pour les cartes de compétences
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observer pour les cartes de projets
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Filtrage des compétences (fonctionnalité bonus)
document.addEventListener('DOMContentLoaded', function() {
    // Créer des boutons de filtre dynamiquement
    const skillsSection = document.querySelector('.skills');
    const skillsContainer = skillsSection.querySelector('.container');
    
    // Créer la barre de filtres
    const filterBar = document.createElement('div');
    filterBar.className = 'filter-bar';
    filterBar.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">Toutes</button>
            <button class="filter-btn" data-filter="technique">Technique</button>
            <button class="filter-btn" data-filter="communication">Communication</button>
            <button class="filter-btn" data-filter="gestion">Gestion</button>
        </div>
    `;
    
    // Ajouter le CSS pour les filtres
    const filterCSS = `
        .filter-bar {
            margin-bottom: 3rem;
            text-align: center;
        }
        
        .filter-buttons {
            display: inline-flex;
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: 4px;
            gap: 4px;
        }
        
        .filter-btn {
            padding: 12px 24px;
            background: transparent;
            border: none;
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all var(--transition-base);
            font-weight: 500;
            color: var(--text-secondary);
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: var(--primary-color);
            color: white;
            box-shadow: var(--shadow-neon);
        }
    `;
    
    // Ajouter le CSS au document
    const style = document.createElement('style');
    style.textContent = filterCSS;
    document.head.appendChild(style);
    
    // Insérer la barre de filtres
    skillsContainer.insertBefore(filterBar, skillsContainer.querySelector('.skills-grid'));
    
    // Gestionnaire de filtrage
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrage des cartes
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
});

// Gestion du formulaire de contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Animation de chargement
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        // Afficher un message de succès
        showNotification('Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.', 'success');
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Restaurer le bouton
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('Données du formulaire:', data);
    }, 2000);
});

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // CSS pour les notifications
    const notificationCSS = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            background: white;
            color: var(--text-primary);
            padding: 16px 24px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            border-left: 4px solid var(--primary-color);
            z-index: 1001;
            max-width: 350px;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            border-left-color: var(--success-color);
        }
        
        .notification-error {
            border-left-color: var(--error-color);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Ajouter le CSS si ce n'est pas déjà fait
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = notificationCSS;
        document.head.appendChild(style);
    }
    
    // Ajouter la notification au DOM
    document.body.appendChild(notification);
    
    // Supprimer la notification après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Animation des statistiques des projets au scroll
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalNumber = statNumber.textContent;
            const isPercentage = finalNumber.includes('%');
            const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
            
            // Animation du compteur
            let startValue = 0;
            const duration = 2000; // 2 secondes
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Fonction d'easing pour une animation plus naturelle
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(easeOutQuart * numericValue);
                
                statNumber.textContent = currentValue + (isPercentage ? '%' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    statNumber.textContent = finalNumber; // S'assurer de la valeur finale exacte
                }
            }
            
            requestAnimationFrame(updateCounter);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observer les statistiques des projets
document.querySelectorAll('.project-stats').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect pour les cartes flottantes du héro
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    const profileImage = document.querySelector('.profile-img');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Parallax pour la photo de profil
    if (profileImage) {
        const yPos = scrolled * 0.3;
        profileImage.style.transform = `translateY(${yPos}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// Navigation active selon la section visible
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Préchargement des images et optimisation des performances
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading pour les éléments non critiques
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('[data-lazy]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.lazy;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Gestionnaire de redimensionnement pour les animations responsives
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculer les positions pour les animations
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.style.transform = 'translateY(0)';
        });
    }, 250);
});

console.log('🚀 Site web professionnel chargé avec succès!');