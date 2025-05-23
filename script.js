// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const loginBtn = document.querySelector('.btn-login');
const registerBtn = document.querySelector('.btn-register');
const modal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close');
const loginForm = document.querySelector('.login-form');
const ctaButtons = document.querySelectorAll('.cta-buttons .btn-primary, .cta-buttons .btn-outline');
const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-secondary');

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Modal Functions
function openModal() {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModalFunc() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Event Listeners for Modal
if (loginBtn) {
    loginBtn.addEventListener('click', openModal);
}

if (registerBtn) {
    registerBtn.addEventListener('click', openModal);
}

if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
}

// Close modal when clicking outside
if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}

// CTA Buttons Event Listeners
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent.includes('Social')) {
            openModal();
        } else {
            // Redirect to academic services
            showNotification('Reindirizzamento ai servizi accademici...', 'info');
        }
    });
});

// Hero Buttons Event Listeners
heroButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent.includes('Inizia')) {
            openModal();
        } else {
            // Scroll to about section
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!email || !password) {
            showNotification('Per favore, compila tutti i campi', 'error');
            return;
        }
        
        if (!email.includes('@campus.unimib.it') && !email.includes('@unimib.it')) {
            showNotification('Utilizza la tua email universitaria (@campus.unimib.it o @unimib.it)', 'error');
            return;
        }
        
        // Simulate login process
        const submitBtn = loginForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<span class="loading"></span> Accesso in corso...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Accesso effettuato con successo! Benvenuto in MyUnimib', 'success');
            closeModalFunc();
            
            // Reset form
            loginForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Simulate redirect to dashboard
            setTimeout(() => {
                showNotification('Reindirizzamento alla dashboard...', 'info');
            }, 1500);
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .service-card, .about-feature, .stat-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + '+';
        }
    }, 16);
}

// Animate counters when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-card h3');
            counters.forEach((counter, index) => {
                const targets = [10000, 500, 250];
                animateCounter(counter, targets[index]);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form Validation Enhancement
const formInputs = document.querySelectorAll('input[type="email"], input[type="password"]');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        clearValidationError(input);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (input.type === 'email') {
        if (!value) {
            isValid = false;
            errorMessage = 'Email richiesta';
        } else if (!value.includes('@campus.unimib.it') && !value.includes('@unimib.it')) {
            isValid = false;
            errorMessage = 'Utilizza la tua email universitaria';
        }
    } else if (input.type === 'password') {
        if (!value) {
            isValid = false;
            errorMessage = 'Password richiesta';
        } else if (value.length < 6) {
            isValid = false;
            errorMessage = 'Password troppo corta';
        }
    }
    
    if (!isValid) {
        showInputError(input, errorMessage);
    } else {
        clearValidationError(input);
    }
    
    return isValid;
}

function showInputError(input, message) {
    clearValidationError(input);
    
    input.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorDiv);
}

function clearValidationError(input) {
    input.style.borderColor = '#e9ecef';
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModalFunc();
    }
    
    // Close notification with Escape key
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Add CSS for notifications dynamically
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 3000;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease;
}

.notification-success {
    background: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
}

.notification-error {
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
}

.notification-info {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    color: #0c5460;
}

.notification-content {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 0.75rem;
}

.notification-icon {
    font-weight: bold;
    font-size: 1.2rem;
}

.notification-message {
    flex: 1;
    font-weight: 500;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.notification-close:hover {
    opacity: 1;
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

@media (max-width: 480px) {
    .notification {
        left: 20px;
        right: 20px;
        max-width: none;
    }
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body initially
    document.body.classList.add('loaded');
    
    // Show welcome message after a short delay
    setTimeout(() => {
        console.log('🎓 Benvenuto in MyUnimib - Il Social Network Accademico!');
        console.log('🔗 Connettiti con la comunità Bicocca');
    }, 1000);
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        console.log('Service Worker support detected');
    });
}

// Export functions for potential external use
window.MyUnimib = {
    openModal,
    closeModal: closeModalFunc,
    showNotification
};
