// main.js

// Skill bar animation
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-bar');

    function animateSkills() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if(rect.top < window.innerHeight - 50) {
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

    // Change every 3 minutes (180,000 ms)
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
}

// Normal images (single)
document.querySelectorAll('.portfolio-img').forEach(img => {
  // Check if parent has .slideshow, skip if yes
  if (!img.closest('.slideshow')) {
    img.addEventListener('click', () => {
      openLightbox([img.src], 0); // only one image
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

let slideImages = []; // store images for lightbox
let currentIndex = 0;

// Open lightbox for normal images
document.querySelectorAll('.portfolio-img:not(.slideshow)').forEach(img => {
  img.addEventListener('click', () => {
    slideImages = [img.src];
    currentIndex = 0;
    lightboxImg.src = slideImages[currentIndex];
    lightbox.classList.add('active'); // ✅ instead of display = 'block'
  });
});

// Open lightbox for slideshow images
document.querySelectorAll('.slideshow img').forEach(img => {
  img.addEventListener('click', (e) => {
    const slides = Array.from(e.target.parentElement.querySelectorAll('img'));
    slideImages = slides.map(slide => slide.src);
    currentIndex = slides.indexOf(e.target);
    lightboxImg.src = slideImages[currentIndex];
    lightbox.classList.add('active'); // ✅ instead of display = 'block'
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active'); // ✅ instead of display = 'none'
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active'); // ✅
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
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

    // Start slideshow
    setInterval(showNextSlide, 3000); // every 3 seconds
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

    // Helper: Show slide by index
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    // Touch start
    slideshow.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    // Touch end
    slideshow.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // minimum swipe distance
            if (diffX > 0) {
                // Swipe left → next
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                // Swipe right → previous
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            showSlide(currentIndex);
            // Auto-slide every 5 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }, 5000);

        }
    });
});
