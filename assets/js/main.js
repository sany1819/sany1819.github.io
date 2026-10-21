document.addEventListener("DOMContentLoaded", () => {
    function decodeContact(b64) { const bin = atob(b64); const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0)); return new TextDecoder().decode(bytes); }
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            const open = navLinks.classList.toggle("active");
            document.body.classList.toggle("menu-open", open);
            hamburger.setAttribute("aria-expanded", open ? "true" : "false");
        });
        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.classList.remove("menu-open");
            hamburger.setAttribute("aria-expanded", "false");
        }));
    }

    // IntersectionObserver, not scroll position — this iframe is rendered at
    // full document height with no internal scrolling (the editor's outer
    // page scrolls instead), so a scroll-event + window.innerHeight check
    // (the original mockup's approach, correct for a real standalone site)
    // would key off a stale/irrelevant height here and could leave sections
    // permanently stuck at opacity:0. IntersectionObserver re-evaluates
    // whenever this document's own viewport is resized — including when the
    // editor grows the iframe to fit content — so it self-corrects instead.
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            reveals.forEach((el) => io.observe(el));
        } else {
            reveals.forEach((el) => el.classList.add("active"));
        }
    }

    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
                navbar.style.background = "var(--nav-bg-scrolled)";
            } else {
                navbar.style.boxShadow = "none";
                navbar.style.background = "var(--nav-bg)";
            }
        });
    }

    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const words = ["Product Development","Manufacturing","Project Coordination","Quality Control","Research & Development","Mechanical Design","Technical Procurement","Automation Enthusiast"];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function typeEffect() {
            const currentWord = words[wordIndex] || '';
            if (isDeleting) { typingElement.textContent = currentWord.substring(0, charIndex - 1); charIndex--; }
            else { typingElement.textContent = currentWord.substring(0, charIndex + 1); charIndex++; }
            typingElement.style.borderRight = '2px solid var(--primary-color)';
            let typeSpeed = isDeleting ? 50 : 100;
            // >=/<=, not === : an empty word makes charIndex overshoot the
            // exact-equality checks (1 > length 0) and the counter runs away.
            if (!isDeleting && charIndex >= currentWord.length) { typeSpeed = 2000; isDeleting = true; }
            else if (isDeleting && charIndex <= 0) { charIndex = 0; isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }
            setTimeout(typeEffect, typeSpeed);
        }
        if (words.length) {
            setInterval(() => {
                typingElement.style.borderRightColor = typingElement.style.borderRightColor === 'transparent' ? 'var(--primary-color)' : 'transparent';
            }, 500);
            setTimeout(typeEffect, 1000);
        }
    }

    document.querySelectorAll('.protected-contact').forEach((contact) => {
        contact.style.cursor = 'pointer';
        contact.style.color = 'var(--primary-color)';
        contact.style.textDecoration = 'underline';
        contact.addEventListener('click', function () {
            // DOM APIs, not innerHTML: the decoded value re-enters the page
            // AFTER the render-time esc() pass, so it must never be parsed
            // as markup.
            const rawInfo = decodeContact(this.getAttribute('data-info'));
            const type = this.getAttribute('data-type');
            if (type === 'email' || type === 'phone') {
                const anchor = document.createElement('a');
                anchor.href = type === 'email' ? 'mailto:' + rawInfo : 'tel:' + rawInfo.replace(/[^0-9+]/g, '');
                anchor.textContent = rawInfo;
                anchor.style.color = 'inherit';
                anchor.style.textDecoration = 'none';
                this.textContent = '';
                this.appendChild(anchor);
            }
            this.style.textDecoration = 'none';
            this.style.cursor = 'default';
        }, { once: true });
    });

    document.querySelectorAll('.protected-link').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'mailto:' + decodeContact(this.getAttribute('data-info'));
        });
    });

    document.querySelectorAll('.contact-cta').forEach((cta) => {
        cta.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'mailto:' + decodeContact(this.getAttribute('data-info'));
        });
    });
});
