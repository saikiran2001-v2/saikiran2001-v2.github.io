// assets/js/script.js

function copyEmail(btn) {
    navigator.clipboard.writeText('bjsaikiran@gmail.com').then(function() {
        var tooltip = btn.querySelector('.copy-tooltip');
        tooltip.classList.add('show');
        setTimeout(function() { tooltip.classList.remove('show'); }, 1500);
    });
}

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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.section-title, .section-subtitle, .glass-card, .project-card, .terminal-window, .achievements-banner, .skill-category').forEach((el, i) => {
        el.classList.add('scroll-fade');
        el.style.transitionDelay = `${(i % 3) * 0.1}s`;
        observer.observe(el);
    });

    // Terminal Typewriter Effect (Simulated)
    const terminalCursor = document.querySelector('.cursor');
    if (terminalCursor) {
        // Optional: Add real typing effect logic here if desired later
    }
});
