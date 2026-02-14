// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeSelect = document.getElementById('theme-select');
    const root = document.documentElement;

    // Load saved theme or default to '' (Midnight)
    const currentTheme = localStorage.getItem('theme') || '';
    if (currentTheme) {
        root.setAttribute('data-theme', currentTheme);
    }

    // Set initial dropdown value
    if (themeSelect) {
        themeSelect.value = currentTheme || 'midnight';

        themeSelect.addEventListener('change', (e) => {
            const theme = e.target.value;
            if (theme === 'midnight') {
                root.removeAttribute('data-theme');
                localStorage.removeItem('theme');
            } else {
                root.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            }
        });
    }
    // Navigation Toggle for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Navbar Background on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .card, .project-card, .terminal-window, .achievements-banner');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.willChange = 'opacity, transform'; // Performance optimization
        // Stagger animations slightly
        el.style.transitionDelay = `${index % 3 * 0.1}s`;
        observer.observe(el);
    });

    // Add class for the actual animation
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Terminal Typewriter Effect (Simulated)
    const terminalCursor = document.querySelector('.cursor');
    if (terminalCursor) {
        // Optional: Add real typing effect logic here if desired later
    }
});
