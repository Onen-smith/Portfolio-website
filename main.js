/* main.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. SELECT CURTAIN (We no longer create it dynamically)
    const curtain = document.querySelector('.app-curtain');

    // 1. PAGE LOAD ANIMATION (Lift Curtain)
    if (typeof gsap !== 'undefined' && curtain) {
        // Force scroll to top
        window.scrollTo(0, 0);

        // Animate curtain UP and away
        gsap.to(curtain, {
            y: '-100%', // Move fully up
            duration: 1.2,
            ease: "expo.inOut",
            delay: 0.2 // Small pause to ensure layout is ready
        });
    }

    // 2. LINK CLICK INTERCEPTION (Drop Curtain)
    const internalLinks = document.querySelectorAll('a');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if valid internal link
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                
                // IMPORTANT: Reset curtain to BOTTOM position instantly
                // We move it to 100% (bottom) without animation first
                gsap.set(curtain, { y: '100%' });

                // Then animate it UP to cover the screen (0%)
                gsap.to(curtain, {
                    y: '0%', // Cover screen
                    duration: 0.8,
                    ease: "expo.out",
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });

    // ... (Keep the rest of your code: Lenis, Cursor, GSAP, Tilt, etc.) ...
    // 3. Initialize Lenis
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 4. Custom Cursor Logic
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // 5. GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();
        const startDelay = 0.8; 

        if (document.querySelector(".hero-title .line")) {
            tl.from(".hero-title .line", {
                y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out", delay: startDelay
            })
            .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .from(".hero-btns", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8");
        }

        if (document.querySelector(".hero-img-wrapper")) {
            tl.to(".hero-img-wrapper", { x: "0%", duration: 1.5, ease: "power3.inOut" }, "-=0.6");
            tl.to(".hero-img", { scale: 1, duration: 1.8, ease: "power2.out" }, "-=1.5");
        }

        if (document.querySelector(".bento-grid")) {
            gsap.from(".bento-item", {
                scrollTrigger: { trigger: ".bento-grid", start: "top 80%" },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
            });
        }
    }


    // 7. Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (menuToggle && overlay) {
        menuToggle.addEventListener('click', () => {
            overlay.classList.toggle('active');
        });
    }
});

