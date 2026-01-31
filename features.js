// ==========================================
// TESTIMONIALS CAROUSEL
// ==========================================
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.getElementById('testimonialDots');

let currentTestimonial = 0;
const totalTestimonials = document.querySelectorAll('.testimonial-card').length;

// Create dots
for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement('span');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    testimonialDots.appendChild(dot);
}

function updateTestimonialPosition() {
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;

    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialPosition();
}

testimonialPrev.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonialPosition();
});

testimonialNext.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonialPosition();
});

// Auto-play
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonialPosition();
}, 5000);

// Pause on hover
document.querySelector('.testimonial-container').addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

document.querySelector('.testimonial-container').addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialPosition();
    }, 5000);
});

// ==========================================
// PROJECT FILTERING
// ==========================================
// Add filter buttons to projects section
const projectsContainer = document.querySelector('.projects .container');
const projectsTitle = document.querySelector('.projects .section-title');

const filterContainer = document.createElement('div');
filterContainer.className = 'project-filters';
filterContainer.innerHTML = `
    <button class="filter-btn active" data-filter="all">All Projects</button>
    <button class="filter-btn" data-filter="ai">AI/ML</button>
    <button class="filter-btn" data-filter="web">Web Dev</button>
    <button class="filter-btn" data-filter="data">Data Science</button>
`;

projectsTitle.after(filterContainer);

// Add data attributes to project cards (you should customize these)
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    // Sample categorization - customize based on actual projects
    if (index === 0) card.dataset.category = 'ai';
    if (index === 1) card.dataset.category = 'web';
    if (index === 2) card.dataset.category = 'data';
});

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==========================================
// SKILLS RADAR CHART
// ==========================================
// Add canvas for skills chart after skills categories
const skillsContainer = document.querySelector('.skills .container');
const chartContainer = document.createElement('div');
chartContainer.className = 'skills-chart-container';
chartContainer.innerHTML = `
    <h3 style="text-align: center; margin-bottom: 2rem; color: var(--text-primary);">Skills Overview</h3>
    <canvas id="skillsChart"></canvas>
`;
skillsContainer.appendChild(chartContainer);

// Create radar chart
const ctx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Frontend', 'Backend', 'AI/ML', 'Database', 'DevOps', 'Mobile'],
        datasets: [{
            label: 'Skill Level',
            data: [90, 85, 87, 80, 75, 70],
            backgroundColor: 'rgba(22, 244, 208, 0.2)',
            borderColor: 'rgba(22, 244, 208, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(22, 244, 208, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(22, 244, 208, 1)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: 'var(--text-primary)',
                    font: {
                        size: 14
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Update chart colors based on theme
function updateChartColors() {
    const theme = document.documentElement.getAttribute('data-theme');
    const currentColor = localStorage.getItem('accentColor') || 'cyan';

    // Update chart with current accent color
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();

    skillsChart.data.datasets[0].backgroundColor = primaryColor + '33'; // 20% opacity
    skillsChart.data.datasets[0].borderColor = primaryColor;
    skillsChart.data.datasets[0].pointBackgroundColor = primaryColor;
    skillsChart.update();
}

// Call on theme/color change
document.getElementById('themeToggle').addEventListener('click', () => {
    setTimeout(updateChartColors, 100);
});

document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        setTimeout(updateChartColors, 100);
    });
});

// ==========================================
// EASTER EGGS
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
    // Create confetti effect
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

    // Add animation keyframes if not exists
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

// ==========================================
// GITHUB WIDGET (Placeholder - requires API setup)
// ==========================================
// Add GitHub stats section
const githubSection = document.createElement('section');
githubSection.className = 'github-stats section';
githubSection.style.background = 'var(--bg-secondary)';
githubSection.innerHTML = `
    <div class="container">
        <h2 class="section-title">GitHub Activity</h2>
        <p class="section-subtitle">My open-source contributions</p>
        <div class="github-widget" style="text-align: center; padding: 3rem; background: var(--bg-card); border-radius: 20px; border: 1px solid var(--border-color);">
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem;">
                📊 Live GitHub Statistics
            </p>
            <img src="https://github-readme-stats.vercel.app/api?username=AdarshBhoutekar&show_icons=true&theme=dark&hide_border=true&bg_color=0a0a0f&title_color=16f4d0&icon_color=7b2cbf&text_color=ffffff" 
                 alt="GitHub Stats" 
                 style="max-width: 100%; border-radius: 10px; margin-bottom: 1.5rem;">
            <img src="https://github-readme-streak-stats.herokuapp.com/?user=AdarshBhoutekar&theme=dark&hide_border=true&background=0a0a0f&ring=16f4d0&fire=7b2cbf&currStreakLabel=16f4d0" 
                 alt="GitHub Streak" 
                 style="max-width: 100%; border-radius: 10px; margin-bottom: 1.5rem;">
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=AdarshBhoutekar&layout=compact&theme=dark&hide_border=true&bg_color=0a0a0f&title_color=16f4d0&text_color=ffffff" 
                 alt="Top Languages" 
                 style="max-width: 100%; border-radius: 10px;">
        </div>
    </div>
`;

// Insert before contact section
const contactSection = document.querySelector('.contact');
contactSection.parentNode.insertBefore(githubSection, contactSection);

console.log('✨ All advanced features loaded! Easter eggs active 🎮');
