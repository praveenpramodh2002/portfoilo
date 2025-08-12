// DOM Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const form = document.querySelector('.contact-form');
const glowEffect = document.querySelector('.glow-effect');

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    }
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Scroll Animation for Sections
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Parallax Effect for Hero Section
document.addEventListener('mousemove', (e) => {
    if (glowEffect) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        const moveX = mouseX * 30;
        const moveY = mouseY * 30;
        
        glowEffect.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
});

// Typing Animation for Hero Title
function setupTypewriter(text) {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;

    function type() {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 1000);
}

// Hero Subtitle Animation
const subtitles = document.querySelectorAll('.hero-subtitle');
let currentSubtitle = 0;

function showNextSubtitle() {
    // Hide current subtitle
    subtitles[currentSubtitle].style.opacity = '0';
    subtitles[currentSubtitle].style.transform = 'translateY(20px)';
    
    // Move to next subtitle
    currentSubtitle = (currentSubtitle + 1) % subtitles.length;
    
    // Show next subtitle
    subtitles[currentSubtitle].style.opacity = '1';
    subtitles[currentSubtitle].style.transform = 'translateY(0)';
    
    // Schedule next change
    setTimeout(showNextSubtitle, 3000);
}

// Start the subtitle rotation after all typing animations complete
setTimeout(() => {
    showNextSubtitle();
}, 10500); // 3.5s * 3 subtitles

// Add hover effect to subtitles
subtitles.forEach(subtitle => {
    subtitle.addEventListener('mouseenter', () => {
        subtitle.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    subtitle.addEventListener('mouseleave', () => {
        subtitle.style.transform = 'translateY(0) scale(1)';
    });
});

// Active Navigation Highlighting
function highlightNavigation() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

// Navbar Background Change on Scroll
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) translateY(-10px) rotateX(5deg)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0) rotateX(0)';
    });
});

// Skill Item Hover Effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Dark Mode Toggle
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDarkScheme.matches) {
    document.body.classList.add('dark-mode');
}

// Service Card Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
    });
});

// Form Submission with Validation
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(form);
        let isValid = true;
        let errorMessage = '';

        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                errorMessage = 'Please fill in all fields';
                break;
            }
            if (key === 'email' && !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
                break;
            }
        }

        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }

        // Simulate form submission
        try {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Helper Functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll Events
window.addEventListener('scroll', () => {
    updateNavbar();
    highlightNavigation();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navbar and navigation
    updateNavbar();
    highlightNavigation();
    
    // Project Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log('Filter buttons found:', filterButtons.length);
    console.log('Project cards found:', projectCards.length);
    
    // Initialize all projects as visible
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        console.log('Card category:', card.getAttribute('data-category'));
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter button clicked:', this.getAttribute('data-filter'));
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            // Filter projects with smooth animation
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                console.log('Checking card:', cardCategory, 'against filter:', filterValue);
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show card
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                    visibleCount++;
                } else {
                    // Hide card
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            console.log('Visible projects:', visibleCount);
        });
    });
});

// Prevent form submission on Enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Add resize listener to handle mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Initialize - show all projects
    projectCards.forEach(card => {
        card.style.display = 'block';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show matching projects
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide non-matching projects
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Reflow the grid layout
            setTimeout(() => {
                projectsGrid.style.display = 'none';
                projectsGrid.offsetHeight; // Trigger reflow
                projectsGrid.style.display = 'grid';
            }, 350);
        });
    });
});});