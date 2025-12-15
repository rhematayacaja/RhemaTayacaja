document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel_history-track');
    const slides = document.querySelectorAll('.carousel_history-track img');
    const prevBtn = document.querySelector('.carousel_history-btn.prev');
    const nextBtn = document.querySelector('.carousel_history-btn.next');

    if (!track || slides.length === 0) return;

    const carousel = track.parentElement;
    let currentIndex = 0;
    let autoplayInterval;
    let startX = 0;
    let endX = 0;

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function restartAutoplay() {
        startAutoplay();
    }

    // Botones
    nextBtn.addEventListener('click', () => {
        nextSlide();
        restartAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        restartAutoplay();
    });

    // Touch
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }

        startAutoplay();
    });

    // Hover (desktop)
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', updateCarousel);
    window.addEventListener('load', () => {
        updateCarousel();
        startAutoplay();
    });
});
