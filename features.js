// ==========================================
// CERTIFICATE CAROUSEL
// ==========================================
(function () {
    const slides = document.querySelectorAll('.cert-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    let currentIndex = 0;

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('prev', 'active', 'next');
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('next');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        updateCarousel();
    }

    if (prevBtn) prevBtn.onclick = () => goToSlide(-1);
    if (nextBtn) nextBtn.onclick = () => goToSlide(1);

    dots.forEach((dot, index) => {
        dot.onclick = () => {
            currentIndex = index;
            updateCarousel();
        };
    });

    updateCarousel();
})();

// ==========================================
// EASTER EGGS (Optional - can remove if not wanted)
// ==========================================
// Konami Code (↑↑↓↓←→←→BA)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const colors = ['#16f4d0', '#7b2cbf', '#a855f7', '#3b82f6', '#f59e0b'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }

    if (!document.getElementById('confetti-animation')) {
        const style = document.createElement('style');
        style.id = 'confetti-animation';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    alert('🎉 You found the secret! Konami Code activated! 🎮');
}

// Logo click counter easter egg
let logoClicks = 0;
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        logoClicks++;
        if (logoClicks === 10) {
            document.body.style.transform = 'rotate(360deg)';
            document.body.style.transition = 'transform 2s ease';
            setTimeout(() => {
                document.body.style.transform = 'rotate(0deg)';
            }, 2000);
            logoClicks = 0;
            console.log('🌀 Wheee! You spun the page!');
        }
    });
}

console.log('✨ Certificate carousel loaded!');
