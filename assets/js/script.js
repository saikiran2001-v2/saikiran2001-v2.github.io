// assets/js/script.js

// ── Analytics (GoatCounter — inline to avoid ad-blocker blocking) ─────────
(function() {
    if (localStorage.getItem('_gc') === location.pathname) return;
    try {
        var img = new Image();
        img.src = 'https://saikiran2001-v2.goatcounter.com/count?p=' +
            encodeURIComponent(location.pathname) +
            '&t=' + encodeURIComponent(document.title) +
            '&r=' + encodeURIComponent(document.referrer || '') +
            '&s=' + encodeURIComponent(screen.width + ',' + screen.height + ',' + (devicePixelRatio || 1)) +
            '&rnd=' + Math.random().toString(36).slice(2);
        localStorage.setItem('_gc', location.pathname);
        setTimeout(function() { localStorage.removeItem('_gc'); }, 8000);
    } catch(e) {}
})();

function copyEmail(btn) {
    navigator.clipboard.writeText('bjsaikiran@gmail.com').then(function() {
        var tooltip = btn.querySelector('.copy-tooltip');
        tooltip.classList.add('show');
        setTimeout(function() { tooltip.classList.remove('show'); }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ── Theme Management ──────────────────────────────────────────────────────
    const THEMES = ['midnight', 'blue', 'light'];
    const THEME_ICONS = {
        midnight: 'fa-moon',
        blue:     'fa-water',
        light:    'fa-sun',
    };
    const THEME_LABELS = {
        midnight: 'Midnight',
        blue:     'Blueish',
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

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // ── Navbar Background on Scroll ───────────────────────────────────────────
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

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

    // ── Reading Progress Bar ─────────────────────────────────────────────────
    const progressBar = document.querySelector('.reading-progress');
    const postBody = document.querySelector('.post-body');
    if (progressBar && postBody) {
        window.addEventListener('scroll', () => {
            const rect = postBody.getBoundingClientRect();
            const start = postBody.offsetTop;
            const total = postBody.scrollHeight;
            const scrolled = window.scrollY - start;
            const pct = Math.min(100, Math.max(0, (scrolled / (total - window.innerHeight)) * 100));
            progressBar.style.width = pct + '%';
        });
    }

    // ── Mobile Nav Accessibility ──────────────────────────────────────────────
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'nav-links');
    }
    if (navLinks) {
        navLinks.id = 'nav-links';
        navLinks.setAttribute('role', 'navigation');
        navLinks.setAttribute('aria-label', 'Main navigation');
    }

    // ── Service Worker Registration ────────────────────────────────────────
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    // ── Contact Form Handling ─────────────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.form-submit');
            const status = contactForm.querySelector('.form-status');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            status.textContent = '';
            status.className = 'form-status';

            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' },
                });
                if (res.ok) {
                    status.textContent = 'Message sent! I\'ll get back to you soon.';
                    status.classList.add('success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed');
                }
            } catch {
                status.innerHTML = 'Blocked by your browser. <a href="mailto:bjsaikiran@gmail.com?subject=' +
                    encodeURIComponent('Contact from portfolio') + '" style="color:var(--accent-primary);text-decoration:underline;">Email me directly</a> instead.';
                status.classList.add('error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }

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
        const count = Math.floor((canvas.width * canvas.height) / 18000);
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
        const map = { midnight: '59,130,246', blue: '59,130,246', light: '37,99,235' };
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

/* ══════════════════════════════════════════════════════════════════
   Toast System
   ══════════════════════════════════════════════════════════════════ */
var _toastContainer = null;

function _getToastContainer() {
    if (!_toastContainer) {
        _toastContainer = document.createElement('div');
        _toastContainer.className = 'toast-container';
        document.body.appendChild(_toastContainer);
    }
    return _toastContainer;
}

function showToast(html, duration) {
    duration = duration || 5000;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = html;
    _getToastContainer().appendChild(toast);
    requestAnimationFrame(function() {
        requestAnimationFrame(function() { toast.classList.add('toast-show'); });
    });
    function dismiss() {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        toast.addEventListener('transitionend', function() { toast.remove(); }, { once: true });
    }
    var timer = setTimeout(dismiss, duration);
    toast.addEventListener('click', function() { clearTimeout(timer); dismiss(); });
}

/* ══════════════════════════════════════════════════════════════════
   Konami Code — ↑↑↓↓←→←→BA
   ══════════════════════════════════════════════════════════════════ */
(function() {
    var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var pos = 0;
    document.addEventListener('keydown', function(e) {
        if (e.key === KONAMI[pos]) {
            pos++;
            if (pos === KONAMI.length) {
                pos = 0;
                var isEasterPage = location.pathname.replace(/\\/g, '/').endsWith('easter-eggs.html');
                if (isEasterPage) {
                    showToast(
                        '<div class="toast-konami-text">🎮 Konami Code! You really are feeling curious.</div>' +
                        '<div class="toast-meta"><span class="toast-char">Respect. Now watch the DVD logo.</span></div>',
                        6000
                    );
                } else {
                    showToast(
                        '<div class="toast-konami-text">🎮 Konami Code unlocked!</div>' +
                        '<div class="toast-meta"><a href="easter-eggs.html" class="toast-konami-link">➜ Visit the Easter Eggs page</a></div>',
                        7000
                    );
                }
            }
        } else {
            pos = (e.key === KONAMI[0]) ? 1 : 0;
        }
    });
})();
