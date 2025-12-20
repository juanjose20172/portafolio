// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Scroll animations (simple AOS alternative)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Add animation to section titles on scroll
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.setAttribute('data-aos', 'fade-up');
    observer.observe(title);
});

// Add animation to stack categories
const stackCategories = document.querySelectorAll('.stack-category');
stackCategories.forEach((category, index) => {
    category.setAttribute('data-aos', 'fade-up');
    category.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(category);
});

// Add animation to about highlights
const highlightItems = document.querySelectorAll('.highlight-item');
highlightItems.forEach((item, index) => {
    item.setAttribute('data-aos', 'fade-up');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${-index * 2}s`;
});

// Tech tags hover effect
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Learning tags hover effect
const learningTags = document.querySelectorAll('.learning-tag');
learningTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add copy functionality for contact email (if present)
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');

        // Create temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copiado!';
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-primary);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: fadeInOut 2s ease;
        `;

        document.body.appendChild(tooltip);

        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            setTimeout(() => {
                document.body.removeChild(tooltip);
            }, 2000);
        });
    });
});

// Add CSS animation for tooltip
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        85% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.2;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add number counter animation for project numbers
const animateNumber = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toString().padStart(2, '0');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Animate project numbers when they come into view
const projectNumbers = document.querySelectorAll('.project-number');
projectNumbers.forEach((number, index) => {
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !number.classList.contains('animated')) {
                number.classList.add('animated');
                animateNumber(number, 0, index + 1, 1000);
            }
        });
    }, { threshold: 0.5 });

    numberObserver.observe(number);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loaded class for initial animations
setTimeout(() => {
    document.body.classList.add('loaded');
}, 100);

// Project Modals Functionality
const projectCards = document.querySelectorAll('.project-card-simple');
const modals = document.querySelectorAll('.project-modal');
const modalCloses = document.querySelectorAll('.modal-close');

// Open modal when clicking project card or "Ver detalles" button
projectCards.forEach(card => {
    const openModal = () => {
        const projectId = card.getAttribute('data-project');
        const modal = document.getElementById(`modal-${projectId}`);

        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Lazy load video iframe
            const iframe = modal.querySelector('iframe');
            if (iframe && iframe.getAttribute('data-src')) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'));
            }
        }
    };

    card.addEventListener('click', (e) => {
        // Don't open if clicking the button (it has its own handler)
        if (!e.target.closest('.btn-view-project')) {
            openModal();
        }
    });

    const button = card.querySelector('.btn-view-project');
    if (button) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal();
        });
    }
});

// Close modal when clicking close button
modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.project-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Stop video when closing modal
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                const src = iframe.getAttribute('src');
                iframe.setAttribute('src', '');
                iframe.setAttribute('data-src', src);
            }
        }
    });
});

// Close modal when clicking outside content
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Stop video when closing modal
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                const src = iframe.getAttribute('src');
                iframe.setAttribute('src', '');
                iframe.setAttribute('data-src', src);
            }
        }
    });
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.project-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Stop video when closing modal
            const iframe = activeModal.querySelector('iframe');
            if (iframe) {
                const src = iframe.getAttribute('src');
                iframe.setAttribute('src', '');
                iframe.setAttribute('data-src', src);
            }
        }
    }
});

// Console message for developers
console.log('%c¡Hola, desarrollador! 👋', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c¿Interesado en ver cómo funciona este portafolio?', 'color: #8b5cf6; font-size: 14px;');
console.log('%cNo dudes en contactarme si tienes alguna pregunta.', 'color: #64748b; font-size: 12px;');
