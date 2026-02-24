// assets/js/script.js

function copyEmail(btn) {
    navigator.clipboard.writeText('bjsaikiran@gmail.com').then(function() {
        var tooltip = btn.querySelector('.copy-tooltip');
        tooltip.classList.add('show');
        setTimeout(function() { tooltip.classList.remove('show'); }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ── Theme Management ──────────────────────────────────────────────────────
    const THEMES = ['midnight', 'blue', 'glass', 'light'];
    const THEME_ICONS = {
        midnight: 'fa-moon',
        blue:     'fa-water',
        glass:    'fa-circle-half-stroke',
        light:    'fa-sun',
    };
    const THEME_LABELS = {
        midnight: 'Midnight',
        blue:     'Blueish',
        glass:    'Glass',
        light:    'Light',
    };

    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        if (theme === 'midnight') {
            root.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            root.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            icon.className = `fas ${THEME_ICONS[theme]}`;
            themeBtn.title = `Theme: ${THEME_LABELS[theme]} — click to switch`;
            themeBtn.setAttribute('aria-label', `Current theme: ${THEME_LABELS[theme]}. Click to cycle themes.`);
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'midnight';
    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') || 'midnight';
            const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
            applyTheme(THEMES[nextIndex]);
        });
    }

    // ── Navigation Toggle for Mobile ─────────────────────────────────────────
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // ── Navbar Background on Scroll ───────────────────────────────────────────
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ── Scroll Animations (Intersection Observer) ─────────────────────────────
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

    // ── Hero Particle Canvas ──────────────────────────────────────────────────
    const canvas = document.getElementById('hero-canvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initParticles(canvas);
    }
});

function initParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); buildParticles(); });

    function randomBetween(a, b) { return a + Math.random() * (b - a); }

    function buildParticles() {
        const count = Math.floor((canvas.width * canvas.height) / 12000);
        particles = Array.from({ length: count }, () => ({
            x:  randomBetween(0, canvas.width),
            y:  randomBetween(0, canvas.height),
            r:  randomBetween(1, 2.5),
            vx: randomBetween(-0.25, 0.25),
            vy: randomBetween(-0.35, -0.1),
            a:  randomBetween(0.2, 0.7),
        }));
    }
    buildParticles();

    function getAccentHex() {
        const theme = document.documentElement.getAttribute('data-theme') || 'midnight';
        const map = { midnight: '59,130,246', blue: '59,130,246', glass: '59,130,246', light: '37,99,235' };
        return map[theme] || '59,130,246';
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rgb = getAccentHex();
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb},${p.a})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            // wrap around
            if (p.y < -5) { p.y = canvas.height + 5; p.x = randomBetween(0, canvas.width); }
            if (p.x < -5) p.x = canvas.width + 5;
            if (p.x > canvas.width + 5) p.x = -5;
        });

        // draw faint connecting lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${rgb},${0.12 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        animFrame = requestAnimationFrame(draw);
    }
    draw();
}

