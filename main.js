// main.js

// Skill bar animation
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-bar');

    function animateSkills() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                const level = bar.getAttribute('data-level');
                bar.style.width = level;
            }
        });
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // trigger on load

    // Header slideshow
    const header = document.querySelector('header');
    const images = [
        'images/Onen PhSh.jpg',
        'images/001.jpg',
        'images/002.jpg',
        'images/003.jpg',
        'images/004.jpg',
        'images/005.jpg',
        'images/006.jpg'
    ];
    let current = 0;

    function changeBackground() {
        current = (current + 1) % images.length;
        header.style.backgroundImage = `url('${images[current]}')`;
    }

    // Set initial background
    header.style.backgroundImage = `url('${images[0]}')`;

    // Change every 6 seconds
    setInterval(changeBackground, 6000);
});

// Helper: show lightbox
function openLightbox(imagesArray, index) {
    slideImages = imagesArray;
    currentIndex = index;
    lightboxImg.src = slideImages[currentIndex];

    // Show or hide navigation arrows
    if (slideImages.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open'); // ✅ Hide logo when lightbox opens
}

// Normal images (single)
document.querySelectorAll('.portfolio-img').forEach(img => {
    if (!img.closest('.slideshow')) {
        img.addEventListener('click', () => {
            openLightbox([img.src], 0);
        });
    }
});

// Slideshow images
document.querySelectorAll('.slideshow img').forEach(img => {
    img.addEventListener('click', (e) => {
        const slides = Array.from(e.target.parentElement.querySelectorAll('img'));
        openLightbox(slides.map(s => s.src), slides.indexOf(e.target));
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let slideImages = [];
let currentIndex = 0;

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open'); // ✅ Show logo again
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open'); // ✅ Show logo again
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open'); // ✅ Show logo again
    }
});

// Navigate slides
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
    lightboxImg.src = slideImages[currentIndex];
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideImages.length;
    lightboxImg.src = slideImages[currentIndex];
});

document.addEventListener("DOMContentLoaded", () => {
    const slideshowContainers = document.querySelectorAll(".slideshow-container");

    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll(".slide");
        let currentSlide = 0;

        function showNextSlide() {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }

        setInterval(showNextSlide, 3000);
    });
});

// Scroll to Top Button
const backToTopBtn = document.getElementById("backToTop");
const lightboxElement = document.getElementById("lightbox");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300 && !lightboxElement.classList.contains('active')) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hide Back-to-Top button when lightbox opens
const observer = new MutationObserver(() => {
    if (lightboxElement.classList.contains('active')) {
        backToTopBtn.style.display = 'none';
    } else {
        backToTopBtn.style.display = '';
    }
});

observer.observe(lightboxElement, { attributes: true, attributeFilter: ['class'] });

// Enable swipe functionality for slideshows on mobile
document.querySelectorAll('.slideshow').forEach(slideshow => {
    let startX = 0;
    let currentIndex = 0;
    const slides = slideshow.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    slideshow.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slideshow.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            showSlide(currentIndex);
        }
    });
});
