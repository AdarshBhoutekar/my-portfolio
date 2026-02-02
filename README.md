#  Adarsh Bhoutekar - Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and professional experience as a Software Engineer and AI/ML enthusiast.

##  Features

- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Dark/Light Theme** - Toggle between dark and light themes with smooth transitions
- **Color Customization** - Choose from 5 different color schemes (Cyan, Purple, Blue, Orange, Green)
- **Interactive Animations** - Smooth scroll animations and hover effects
- **Particle Background** - Dynamic particle animation on hero section
- **3D Tilt Effect** - Interactive 3D tilt on profile image
- **Project Showcase** - Detailed project cards with modal popups
- **Certificate Carousel** - Interactive carousel displaying certifications
- **Contact Form** - Fully functional contact form integrated with Formspree
- **Back to Top Button** - Quick navigation back to the top
- **SEO Optimized** - Meta tags and semantic HTML for better search engine visibility

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, flexbox, and grid
- **JavaScript (ES6+)** - Interactive features and animations

### Libraries & Tools
- **Remix Icons** - Modern icon library
- **Chart.js** - Data visualization (optional)
- **Formspree** - Contact form backend
- **Google Fonts** - Poppins, Inter, and JetBrains Mono fonts

### Design Features
- CSS Variables for theming
- Glassmorphism effects
- Smooth animations and transitions
- Intersection Observer API for scroll animations
- Custom particle system

## 📂 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── style.css               # Main stylesheet
├── enhancements.css        # Additional enhancements
├── script.js               # Main JavaScript functionality
├── features.js             # Additional features
├── carousel-infinite.js    # Certificate carousel
├── assets/                 # Images and resources
│   ├── profile.jpg
│   ├── project-1.jpg
│   ├── project-2.jpg
│   ├── project-3.jpg
│   └── resume.pdf
├── certificates/           # Certificate PDFs
│   ├── Blockchain Basics.pdf
│   ├── Database Structures and Management with MySQL.pdf
│   ├── Databases and SQL for Data Science with Python.pdf
│   ├── Introduction to Generative AI.pdf
│   ├── Python Basics.pdf
│   └── dsa-java.pdf
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- (Optional) Local server for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdarshBhoutekar/my-portfolio.git
   cd my-portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use Live Server extension in VS Code for live reload

3. **Customize Content**
   - Update personal information in `index.html`
   - Replace images in `assets/` folder
   - Modify colors in CSS variables in `style.css`
   - Update project details in `script.js` (projectDetails object)

## 🎨 Customization

### Changing Theme Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --accent-primary: #16f4d0;
    --accent-secondary: #7b2cbf;
    --bg-primary: #0a0a0f;
    /* ... more variables */
}
```

### Adding Projects
Update the `projectDetails` object in `script.js`:
```javascript
const projectDetails = {
    project1: {
        title: 'Your Project',
        description: 'Project description...',
        features: ['Feature 1', 'Feature 2'],
        technologies: ['Tech1', 'Tech2'],
        github: 'https://github.com/...',
        demo: 'https://...'
    }
};
```

### Contact Form Setup
The contact form uses Formspree. To set up:
1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Replace the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

##  Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

##  Key Sections

1. **Hero Section** - Introduction and CTA buttons
2. **About** - Personal information and statistics
3. **Skills** - Technical skills categorized by domain
4. **Projects** - Featured project showcase
5. **Experience** - Work experience and certifications
6. **Contact** - Contact form and social links

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Author

**Adarsh Bhoutekar**
- Portfolio: [Live Demo](https://my-portfolio-five-chi-14.vercel.app/)
- GitHub: [@AdarshBhoutekar](https://github.com/AdarshBhoutekar)
- LinkedIn: [Adarsh Bhoutekar](https://linkedin.com/in/adarsh-bhoutekar-64b692290)
<!-- - Twitter: [@AdarshBhoutekar](https://twitter.com/AdarshBhoutekar) -->
- Email: adarshbhoutekar@gmail.com

##  Acknowledgments

- Font families from [Google Fonts](https://fonts.google.com/)
- Icons from [Remix Icon](https://remixicon.com/)
- Contact form by [Formspree](https://formspree.io/)
- Inspiration from various portfolio designs

##  Future Enhancements

- [ ] Add blog section
- [ ] Implement PWA features
- [ ] Add more interactive animations
- [ ] Create admin panel for content management
- [ ] Add multilingual support

---

⭐ **If you like this project, please give it a star!** ⭐

