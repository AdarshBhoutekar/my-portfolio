// ==========================================
// TYPING ANIMATION
// ==========================================
const typedTextSpan = document.querySelector('.typed-text');
const titles = [
    'Software Engineer',
    'AI/ML Developer',
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typedTextSpan.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        typedTextSpan.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Start typing animation
setTimeout(() => {
    if (typedTextSpan) type();
}, 500);

// ==========================================
// PARTICLE BACKGROUND
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;
const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repel effect
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 3;
            this.y -= Math.sin(angle) * force * 3;
        }

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(22, 244, 208, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Connect nearby particles
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(22, 244, 208, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// ==========================================
// PARTICLE TRAIL CURSOR
// ==========================================
if (window.innerWidth > 768) {
    let isHoveringClickable = false;
    let lastParticleTime = 0;

    window.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();

        if (currentTime - lastParticleTime < particleInterval) {
            return;
        }

        lastParticleTime = currentTime;
        createParticle(e.clientX, e.clientY, isHoveringClickable);
    });

    function createParticle(x, y, isActive) {
        const particle = document.createElement('div');
        particle.className = isActive ? 'cursor-particle active' : 'cursor-particle';

        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', offsetX + 'px');
        particle.style.setProperty('--ty', offsetY + 'px');

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 800);
    }

    // Track hover state on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, select, .project-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHoveringClickable = true;
        });
        el.addEventListener('mouseleave', () => {
            isHoveringClickable = false;
        });
    });
}

// ==========================================
// THEME TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 500);

    setTimeout(() => {
        const currentColor = localStorage.getItem('accentColor') || 'cyan';
        if (typeof applyColorScheme === 'function') {
            applyColorScheme(currentColor);
        }
    }, 50);
});

// ==========================================
// COLOR PICKER
// ==========================================
const colorPickerToggle = document.getElementById('colorPickerToggle');
const colorPalette = document.getElementById('colorPalette');
const colorOptions = document.querySelectorAll('.color-option');

const colorSchemes = {
    cyan: {
        dark: { primary: '#16f4d0', secondary: '#7b2cbf', glow: 'rgba(22, 244, 208, 0.3)' },
        light: { primary: '#00b8a9', secondary: '#6a4c93', glow: 'rgba(0, 184, 169, 0.3)' }
    },
    purple: {
        dark: { primary: '#a855f7', secondary: '#ec4899', glow: 'rgba(168, 85, 247, 0.3)' },
        light: { primary: '#9333ea', secondary: '#db2777', glow: 'rgba(147, 51, 234, 0.3)' }
    },
    blue: {
        dark: { primary: '#3b82f6', secondary: '#06b6d4', glow: 'rgba(59, 130, 246, 0.3)' },
        light: { primary: '#2563eb', secondary: '#0891b2', glow: 'rgba(37, 99, 235, 0.3)' }
    },
    orange: {
        dark: { primary: '#f59e0b', secondary: '#ef4444', glow: 'rgba(245, 158, 11, 0.3)' },
        light: { primary: '#ea580c', secondary: '#dc2626', glow: 'rgba(234, 88, 12, 0.3)' }
    },
    green: {
        dark: { primary: '#10b981', secondary: '#14b8a6', glow: 'rgba(16, 185, 129, 0.3)' },
        light: { primary: '#059669', secondary: '#0d9488', glow: 'rgba(5, 150, 105, 0.3)' }
    }
};

function applyColorScheme(colorName) {
    const theme = html.getAttribute('data-theme');
    const colors = colorSchemes[colorName][theme];

    document.documentElement.style.setProperty('--accent-primary', colors.primary);
    document.documentElement.style.setProperty('--accent-secondary', colors.secondary);
    document.documentElement.style.setProperty('--glow', colors.glow);
}

const savedColor = localStorage.getItem('accentColor') || 'cyan';
applyColorScheme(savedColor);

colorPickerToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    colorPalette.classList.toggle('active');

    colorPickerToggle.style.transform = colorPalette.classList.contains('active')
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
});

colorOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const color = option.getAttribute('data-color');

        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        applyColorScheme(color);
        localStorage.setItem('accentColor', color);

        setTimeout(() => {
            colorPalette.classList.remove('active');
            colorPickerToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });

    if (option.getAttribute('data-color') === savedColor) {
        option.classList.add('active');
    }
});

// ==========================================
// MOBILE NAVIGATION
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    if (colorPalette && !colorPalette.contains(e.target) && e.target !== colorPickerToggle) {
        colorPalette.classList.remove('active');
        if (colorPickerToggle) colorPickerToggle.style.transform = 'rotate(0deg)';
    }
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// About section
const aboutImage = document.querySelector('.about-image');
const aboutText = document.querySelector('.about-text');

if (aboutImage) {
    aboutImage.classList.add('slide-left');
    observer.observe(aboutImage);
}

if (aboutText) {
    aboutText.classList.add('slide-right');
    observer.observe(aboutText);
}

// ==========================================
// 3D TILT EFFECT FOR PROFILE IMAGE
// ==========================================
const imageWrapper = document.querySelector('.image-wrapper');

if (imageWrapper) {
    let bounds;
    let mouseX = 0;
    let mouseY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    imageWrapper.addEventListener('mouseenter', () => {
        bounds = imageWrapper.getBoundingClientRect();
    });

    imageWrapper.addEventListener('mousemove', (e) => {
        if (!bounds) return;

        mouseX = e.clientX - bounds.left - bounds.width / 2;
        mouseY = e.clientY - bounds.top - bounds.height / 2;
    });

    imageWrapper.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
        bounds = null;
    });

    function animate() {
        if (bounds) {
            const targetRotateY = (mouseX / (bounds.width / 2)) * 20;
            const targetRotateX = (mouseY / (bounds.height / 2)) * -20;

            currentRotateX += (targetRotateX - currentRotateX) * 0.1;
            currentRotateY += (targetRotateY - currentRotateY) * 0.1;
        } else {
            currentRotateX += (0 - currentRotateX) * 0.15;
            currentRotateY += (0 - currentRotateY) * 0.15;
        }

        imageWrapper.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale3d(1.05, 1.05, 1.05)`;

        requestAnimationFrame(animate);
    }

    animate();
}

// Skills animation
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.classList.add('fade-in');
    category.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(category);
});

// Projects animation
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Contact animation
const contactInfo = document.querySelector('.contact-info');
const contactFormElement = document.querySelector('.contact-form');

if (contactInfo) {
    contactInfo.classList.add('slide-left');
    observer.observe(contactInfo);
}

if (contactFormElement) {
    contactFormElement.classList.add('slide-right');
    observer.observe(contactFormElement);
}

// Check viewport on load
setTimeout(() => {
    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            el.classList.add('visible');
        }
    });
}, 100);

// ==========================================
// PROJECT MODAL
// ==========================================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

const projectDetails = {
    project1: {
        title: 'Movie Recommendation System',
        description: 'Get your movie recommendations based on your interests. A movie recommendation system using collaborative filtering to suggest personalized movies based on user preferences and viewing patterns.',
        features: [
            'Developed a movie recommendation system using collaborative filtering',
            'Implemented user interface using PyCharm',
            'Personalized movie recommendations using ML algorithms',
            'Similar movie suggestions based on user preferences',
            'Data processing and analysis with Pandas and NumPy'
        ],
        technologies: ['Python', 'Pandas', 'NumPy', 'PyCharm', 'Scikit-learn'],
        github: 'https://github.com/AdarshBhoutekar/movie-recommender-system',
        demo: 'https://movie-recommender-system-flulzcthmmyscqxk3zzy36.streamlit.app/'
    },
    project2: {
        title: 'Personal Portfolio Website',
        description: 'A modern, fully responsive portfolio website built from scratch to showcase my projects, skills, and professional journey. Features stunning animations, interactive elements, and a premium dark theme design.',
        features: [
            'Responsive design for all devices',
            'Smooth animations and transitions',
            'Interactive particle background',
            'Dark/Light theme toggle',
            'Working contact form with email integration'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Formspree'],
        github: 'https://github.com/AdarshBhoutekar/my-portfolio',
        demo: 'https://my-portfolio-five-chi-14.vercel.app/'
    },
    project3: {
        title: 'Carbon Footprint Calculator',
        description: 'A web application that calculates and tracks personal carbon footprint, providing insights and suggestions for reducing environmental impact based on daily activities, transportation, and energy usage.',
        features: [
            'Calculate carbon emissions from various activities',
            'Interactive web interface for data input',
            'Visual charts showing environmental impact',
            'Personalized recommendations for reduction',
            'Track and monitor carbon footprint over time'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/AdarshBhoutekar/carbon-footprint-calculator',
        demo: 'https://adarshbhoutekar.github.io/carbon-footprint-calculator/'
    }
};

function openModal(projectId) {
    const project = projectDetails[projectId];

    if (!project) return;

    modalBody.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h2>
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">${project.description}</p>
        
        <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--accent-primary);">Key Features</h3>
        <ul style="list-style: none; margin-bottom: 2rem;">
            ${project.features.map(feature => `
                <li style="color: var(--text-secondary); margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;">
                    <span style="position: absolute; left: 0; color: var(--accent-primary);">✓</span>
                    ${feature}
                </li>
            `).join('')}
        </ul>
        
        <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--accent-primary);">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${project.technologies.map(tech => `
                <span class="tag">${tech}</span>
            `).join('')}
        </div>
        
        <div style="display: flex; gap: 1rem;">
            <a href="${project.github}" class="btn btn-primary" style="display: inline-flex;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View Code
            </a>
            <a href="${project.demo}" class="btn btn-secondary" style="display: inline-flex;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
            </a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    return emailRegex.test(email.trim());
}

function validateSubject(subject) {
    return subject.trim().length >= 5;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);

    errorElement.textContent = message;
    errorElement.classList.add('active');
    inputElement.style.borderColor = '#ff4757';
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);

    errorElement.classList.remove('active');
    inputElement.style.borderColor = 'var(--border-color)';
}

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError('name', 'Name must be at least 2 characters long');
    } else {
        clearError('name');
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError('email', 'Please enter a valid email address');
    } else {
        clearError('email');
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError('subject', 'Subject must be at least 5 characters long');
    } else {
        clearError('subject');
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError('message', 'Message must be at least 10 characters long');
    } else {
        clearError('message');
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formMessage.className = 'form-message';
    formMessage.textContent = '';

    const name = nameInput.value;
    const email = emailInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;

    let isValid = true;

    if (!validateName(name)) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        clearError('name');
    }

    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }

    if (!validateSubject(subject)) {
        showError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    } else {
        clearError('subject');
    }

    if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearError('message');
    }

    if (isValid) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.className = 'form-message success';
                formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                contactForm.reset();

                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 5000);
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = '✗ Oops! There was a problem. Please try again.';
            }
        } catch (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = '✗ Network error. Please check your connection and try again.';
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
});

// ==========================================
// RESUME DOWNLOAD
// ==========================================
const resumeBtn = document.getElementById('resumeBtn');

resumeBtn.addEventListener('click', (e) => {
    resumeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resumeBtn.style.transform = '';
    }, 150);

    console.log('Resume downloaded');
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// STAT COUNTER ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);

        if (!isNaN(number)) {
            let current = 0;
            const increment = number / 50;
            const suffix = text.replace(number, '');

            const updateNumber = () => {
                current += increment;
                if (current < number) {
                    stat.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = text;
                }
            };

            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        statObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            statObserver.observe(stat.closest('.stat-card'));
        }
    });
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #16f4d0;');
console.log('%cLooking at the code? I like your style! 🚀', 'font-size: 14px; color: #7b2cbf;');
console.log('%cCheck out the source: https://github.com/AdarshBhoutekar/my-portfolio', 'font-size: 12px; color: #b0b3c1;');
