// Portfolio Website JavaScript

// DOM Elements
const navbar = document.querySelector('.header');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formSuccess = document.getElementById('formSuccess');
const downloadResumeBtn = document.getElementById('download-resume');

// Project Data
const projects = {
    'diabetic-prediction': {
        title: 'Diabetic Prediction System',
        problem: 'High rates of undiagnosed diabetes leading to severe health complications and increased healthcare costs.',
        solution: 'Developed a machine learning model using patient health data including glucose levels, BMI, age, and family history to predict diabetes risk with 85% accuracy.',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
        impact: 'Early detection system that can identify at-risk patients before symptoms appear, enabling preventative care and reducing long-term healthcare costs.',
        github: 'https://github.com/kanha/diabetic-prediction'
    },
    'plant-disease': {
        title: 'Plant Disease Prediction',
        problem: 'Farmers losing crops due to late detection of plant diseases, resulting in significant economic losses and food waste.',
        solution: 'Created a computer vision system using convolutional neural networks to analyze leaf images and identify disease patterns with 92% accuracy.',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'Keras', 'Image Processing'],
        impact: 'Mobile application that allows farmers to quickly diagnose plant diseases in the field, enabling timely treatment and crop preservation.',
        github: 'https://github.com/kanha/plant-disease-detection'
    },
    'mind-state': {
        title: 'Mind State Detection',
        problem: 'Lack of real-time mental state monitoring for stress management and cognitive performance optimization.',
        solution: 'Built an EEG-based system that analyzes brainwave patterns to detect stress, focus, and relaxation states in real-time.',
        technologies: ['Python', 'Machine Learning', 'Signal Processing', 'NumPy', 'SciPy'],
        impact: 'Wearable device integration for real-time mental state feedback, helping users optimize productivity and manage stress effectively.',
        github: 'https://github.com/kanha/mind-state-detection'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimation();
    initSkillBars();
    initProjectModals();
    initContactForm();
    initDownloadResume();
    setActiveNavOnScroll();
});

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Scroll Animation with Intersection Observer
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .project-card, .timeline-item, .education-card, .competency-item').forEach(el => {
        observer.observe(el);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const observerOptions = {
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-fill');
                skillBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-percentage');
                    setTimeout(() => {
                        bar.style.width = percentage;
                    }, 500);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skills-category').forEach(el => {
        skillObserver.observe(el);
    });
}

// Project Modals
function initProjectModals() {
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal();
        }
    });

    // Keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.style.display === 'block') {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    
    modalContent.innerHTML = `
        <div class="modal-project-details">
            <div class="modal-section">
                <h4>Problem Statement</h4>
                <p>${project.problem}</p>
            </div>
            <div class="modal-section">
                <h4>Solution Approach</h4>
                <p>${project.solution}</p>
            </div>
            <div class="modal-section">
                <h4>Technologies Used</h4>
                <div class="modal-tech-grid">
                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="modal-section">
                <h4>Impact & Results</h4>
                <p>${project.impact}</p>
            </div>
            <div class="modal-section">
                <h4>GitHub Repository</h4>
                <a href="${project.github}" target="_blank" class="btn btn-primary" rel="noopener noreferrer">
                    View on GitHub <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;

    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    modalClose.focus();
}

function closeProjectModal() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact Form Validation
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name');
            isValid = false;
        } else {
            hideError(nameInput, nameError);
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailInput, emailError);
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            hideError(messageInput, messageError);
        }

        if (isValid) {
            submitForm();
        }
    });

    // Real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', () => {
            const errorElement = document.getElementById(input.id + '-error');
            if (errorElement.textContent) {
                validateField({ target: input });
            }
        });
    });
}

function validateField(e) {
    const input = e.target;
    const errorElement = document.getElementById(input.id + '-error');

    switch (input.id) {
        case 'name':
            if (input.value.trim() === '') {
                showError(input, errorElement, 'Please enter your name');
            } else {
                hideError(input, errorElement);
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                showError(input, errorElement, 'Please enter a valid email address');
            } else {
                hideError(input, errorElement);
            }
            break;
        case 'message':
            if (input.value.trim() === '') {
                showError(input, errorElement, 'Please enter your message');
            } else if (input.value.trim().length < 10) {
                showError(input, errorElement, 'Message must be at least 10 characters long');
            } else {
                hideError(input, errorElement);
            }
            break;
    }
}

function showError(input, errorElement, message) {
    input.style.borderColor = '#ef4444';
    errorElement.textContent = message;
}

function hideError(input, errorElement) {
    input.style.borderColor = '';
    errorElement.textContent = '';
}

function submitForm() {
    // Simulate form submission
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        contactForm.reset();
        formSuccess.style.display = 'block';
        formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);

    }, 1500);
}

// Download Resume Functionality
function initDownloadResume() {
    downloadResumeBtn.addEventListener('click', function() {
        // Create a simple resume content
        const resumeContent = `
Kanha - Software Developer | Machine Learning Enthusiast
========================================================

CONTACT INFORMATION
-------------------
Email: kanha@example.com
Location: India
LinkedIn: linkedin.com/in/kanha
GitHub: github.com/kanha

PROFESSIONAL SUMMARY
--------------------
Passionate software developer with expertise in Java, Python, and SQL.
Specialized in machine learning applications and web development.
Committed to creating efficient, scalable solutions that drive business value.

TECHNICAL SKILLS
----------------
Programming Languages: Java, Python, SQL
Machine Learning: Scikit-learn, TensorFlow, Data Preprocessing
Web Development: HTML5, CSS3, JavaScript
Database Management: SQL, Database Design
Tools & Frameworks: Git, VS Code, Jupyter Notebook

PROFESSIONAL EXPERIENCE
-----------------------

Machine Learning Intern | Coincent
2023 - 2024
- Developed and implemented machine learning models for predictive analytics
- Worked on data preprocessing, feature engineering, and model optimization
- Collaborated with cross-functional teams to deliver data-driven solutions

Web Development Intern | SkySkill
2022 - 2023
- Built responsive web applications using modern frontend technologies
- Implemented RESTful APIs and database integrations
- Participated in code reviews and agile development processes

EDUCATION
---------
Bachelor's Degree | CGPA: 8.73
Current Pursuit

PROJECTS
--------
Diabetic Prediction System
- Machine learning model to predict diabetes risk using patient health data
- Technologies: Python, Scikit-learn, Pandas
- Impact: 85% accuracy in early detection

Plant Disease Prediction
- Computer vision system to identify plant diseases from leaf images
- Technologies: Python, TensorFlow, OpenCV
- Impact: 92% accuracy in disease identification

Mind State Detection
- EEG-based system to detect and classify mental states in real-time
- Technologies: Python, Machine Learning, Signal Processing
- Impact: Real-time mental state monitoring

REFERENCES
----------
Available upon request
        `;

        // Create and download the resume
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kanha_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Active Navigation on Scroll
function setActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels to project buttons
    const projectButtons = document.querySelectorAll('.project-btn');
    projectButtons.forEach((btn, index) => {
        const projectTitle = btn.parentElement.querySelector('h3').textContent;
        btn.setAttribute('aria-label', `View details for ${projectTitle}`);
    });

    // Add keyboard navigation for project cards
    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Header scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}));

// Lazy loading for images (if added in future)
document.addEventListener('DOMContentLoaded', () => {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for older browsers
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// Console message for developers
console.log(`
🚀 Portfolio Website Loaded Successfully!

📧 Contact: kanha@example.com
💻 Technologies: HTML5, CSS3, Vanilla JavaScript
🎯 Features: Responsive Design, Accessibility, Performance Optimized

For source code and more projects, visit: github.com/kanha
`);