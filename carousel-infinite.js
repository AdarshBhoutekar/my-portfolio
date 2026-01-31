
// CERTIFICATE CAROUSEL - INFINITE LOOP

const initCertificateCarousel = () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.cert- slide'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = Array.from(document.querySelectorAll('.dot'));

    if (!track || slides.length === 0) return;

    // Clone slides for infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    let currentIndex = 1; // Start at first real slide (after clone)
    let isTransitioning = false;

    const getSlideWidth = () => {
        return track.querySelector('.cert-slide').getBoundingClientRect().width;
    };

    const updateCarousel = (animate = true) => {
        const slideWidth = getSlideWidth();
        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Update dots (use real index)
        const realIndex = currentIndex - 1;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    };

    const goToSlide = (direction) => {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex += direction;
        updateCarousel(true);

        // Handle infinite loop
        setTimeout(() => {
            if (currentIndex === 0) {
                // At clone of last slide, jump to real last slide
                currentIndex = slides.length;
                updateCarousel(false);
            } else if (currentIndex === slides.length + 1) {
                // At clone of first slide, jump to real first slide
                currentIndex = 1;
                updateCarousel(false);
            }
            isTransitioning = false;
        }, 600); // Match transition duration
    };

    const goToDot = (dotIndex) => {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = dotIndex + 1;
        updateCarousel(true);

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    };

    // Arrow button navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(-1));
    }

    if (nextBtn) {
        prevBtn.addEventListener('click', () => goToSlide(1));
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToDot(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(-1);
        if (e.key === 'ArrowRight') goToSlide(1);
    });

    // Update on resize
    window.addEventListener('resize', () => updateCarousel(false));

    // Initialize
    updateCarousel(false);
};

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCertificateCarousel);
} else {
    initCertificateCarousel();
}
