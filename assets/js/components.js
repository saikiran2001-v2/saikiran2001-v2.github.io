// assets/js/components.js — Shared header, footer, and skip-to-content

(function () {
    const page = location.pathname.split('/').pop() || 'index.html';
    const isHome = page === 'index.html' || page === '' || page === '/';

    function href(path) {
        // On homepage, use # anchors directly; on subpages, prefix with index.html
        if (path.startsWith('#')) return isHome ? path : 'index.html' + path;
        return path;
    }

    function activeClass(target) {
        // Mark the nav link as active if it matches the current page
        if (target === page) return ' class="active"';
        // Blog posts also highlight the Blogs link
        if (target === 'blog.html' && page.startsWith('blog')) return ' class="active"';
        return '';
    }

    // ── Skip to Content ───────────────────────────────────────────────────
    const skipLink = document.getElementById('skip-to-content');
    if (skipLink) {
        skipLink.outerHTML = '<a href="#main-content" class="skip-to-content">Skip to content</a>';
    }

    // ── Navigation ────────────────────────────────────────────────────────
    const navSlot = document.getElementById('site-nav');
    if (navSlot) {
        const iasLink = isHome
            ? '<li><a href="ias-demo.html">IAS Demo</a></li>'
            : '';

        navSlot.outerHTML = `
    <nav class="navbar">
        <div class="container nav-container">
            <a href="${isHome ? '#' : 'index.html'}" class="logo">Sai<span class="accent">kiran</span>.</a>
            <ul class="nav-links">
                <li class="nav-dropdown">
                    <a href="${href('#professional-projects')}" class="nav-dropdown-toggle">Projects <i class="fas fa-chevron-down" style="font-size:0.65rem;margin-left:0.25rem;"></i></a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="${href('#professional-projects')}"><i class="fas fa-briefcase"></i> Professional Projects</a></li>
                        <li><a href="${href('#projects')}"><i class="fas fa-code"></i> Personal Projects</a></li>
                    </ul>
                </li>
                ${iasLink}
                <li><a href="${href('#linux-works')}"${activeClass('linux-works')}>Linux Works</a></li>
                <li><a href="rust-playground.html"${activeClass('rust-playground.html')}>My Rust Playground</a></li>
                <li><a href="blog.html"${activeClass('blog.html')}>Blogs</a></li>
                <li><a href="#contact" class="btn btn-primary">Contact Me</a></li>
                <li>
                    <a href="easter-eggs.html" class="theme-toggle-btn" aria-label="Easter eggs" title="I'm feeling curious" style="text-decoration:none;">
                        <i class="fas fa-egg"></i>
                    </a>
                </li>
                <!-- Theme Toggle -->
                <li>
                    <button id="theme-toggle" class="theme-toggle-btn" aria-label="Switch theme" title="Switch theme">
                        <i class="fas fa-moon"></i>
                    </button>
                </li>
            </ul>
            <button class="menu-toggle" aria-label="Toggle navigation menu">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </nav>`;
    }

    // ── Footer ────────────────────────────────────────────────────────────
    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
        footerSlot.outerHTML = `
    <footer id="contact">
        <div class="container footer-content">
            <div class="footer-left">
                <h3>Let's collaborate.</h3>
                <p>Open for opportunities in Power Platform development and Linux administration.</p>
                <div class="footer-buttons">
                    <a href="assets/Saikiran_Resume.pdf" download class="btn btn-secondary"><i class="fas fa-download"></i> Download Resume</a>
                    <div class="footer-buttons-row">
                        <a href="mailto:bjsaikiran@gmail.com" class="email-link"><i class="fas fa-envelope"></i> bjsaikiran@gmail.com</a>
                        <button class="btn-copy-email" onclick="copyEmail(this)" title="Copy email" aria-label="Copy email address"><i class="fas fa-copy"></i><span class="copy-tooltip">Copied!</span></button>
                    </div>
                </div>
                <p class="contact-divider">Or Contact me from here</p>
                <form id="contact-form" action="https://formspree.io/f/mlgwagkl" method="POST" class="contact-form">
                    <div class="form-group">
                        <label for="contact-name">Name</label>
                        <input type="text" id="contact-name" name="name" required autocomplete="name" placeholder="Your name">
                    </div>
                    <div class="form-group">
                        <label for="contact-email">Email</label>
                        <input type="email" id="contact-email" name="email" required autocomplete="email" placeholder="you@example.com">
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" name="message" required placeholder="What's on your mind?"></textarea>
                    </div>
                    <button type="submit" class="form-submit"><i class="fas fa-paper-plane"></i> Send Message</button>
                    <div class="form-status" aria-live="polite"></div>
                </form>
            </div>
            <div class="footer-socials">
                <a href="https://github.com/saikiran2001-v2" target="_blank" class="social-icon" aria-label="GitHub profile" title="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/jaya-saikiran-banigallapati-08a431177/" target="_blank" class="social-icon" aria-label="LinkedIn profile" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Saikiran. All rights reserved.</p>
        </div>
    </footer>`;
    }
})();
