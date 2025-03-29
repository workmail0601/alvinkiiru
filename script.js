// === Toggle Mobile Menu ===
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
  }
  
// === Hide Navbar on Scroll to About Me Section ===
window.addEventListener("scroll", function () {
    const navbar = document.querySelector('.navbar');
    const aboutMeSection = document.querySelector('#about-me');

    if (aboutMeSection) {
        const aboutMePosition = aboutMeSection.getBoundingClientRect().top;

        // Hide navbar when about-me is reached
        if (aboutMePosition <= 0) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    }
});
  

// ======= Carousel Logic =======
const carouselContainer = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

// Adjust rotation speed based on screen size
function getRotationSpeed() {
    if (window.innerWidth >= 1400) return 5000; // 5s for 5 items
    if (window.innerWidth >= 1024) return 6000; // 6s for 3 items
    if (window.innerWidth >= 768) return 7000; // 7s for 2 items
    return 5000; // 5s for 1 item
}

// Get visible items based on screen size
function getVisibleItems() {
    if (window.innerWidth >= 1400) return 5;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

// Move Slide (with infinite scroll)
function moveSlide(direction) {
    const itemsVisible = getVisibleItems();
    currentIndex += direction;

    // Infinite scroll handling
    if (currentIndex < 0) currentIndex = slides.length - itemsVisible;
    if (currentIndex > slides.length - itemsVisible) currentIndex = 0;

    const offset = -(currentIndex * (100 / itemsVisible));
    carouselContainer.style.transform = `translateX(${offset}%)`;

    // Reset auto-slide on manual navigation
    resetAutoSlide();
}

// Auto Slide Functionality
function autoSlide() {
    moveSlide(1);
}

// Reset Auto-Slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, getRotationSpeed());
}

// Initial setup
let autoSlideInterval = setInterval(autoSlide, getRotationSpeed());

// Adjust rotation speed when window resizes
window.addEventListener('resize', () => {
    resetAutoSlide();
});

// Add event listeners for arrows (assuming you have buttons with these classes)
document.querySelector('.carousel-arrow.left').addEventListener('click', () => moveSlide(-1));
document.querySelector('.carousel-arrow.right').addEventListener('click', () => moveSlide(1));
