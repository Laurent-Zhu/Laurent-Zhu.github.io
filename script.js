/**
 * Laurent Zhu Personal Portfolio
 * Main JavaScript File
 */

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initStatsCounter();
    initProjects();
    initBackToTop();
});

// ===== Navigation =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// ===== Typing Effect =====
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Developer',
        'Open Source Enthusiast',
        'Creator',
        'Problem Solver',
        'Tech Explorer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== Skill Bars Animation =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.style.getPropertyValue('--progress');
                entry.target.style.width = progress;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== Stats Counter Animation =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== Projects Section =====
function initProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    // Project data - Customize this with your actual projects
    const projects = [
        {
            title: 'Web Application',
            description: '一个现代化的网页应用，使用最新的前端技术构建，提供流畅的用户体验和优秀的性能表现。',
            icon: 'ri-layout-2-line',
            tags: ['React', 'Node.js', 'MongoDB'],
            github: '#',
            demo: '#'
        },
        {
            title: 'Data Analysis Tool',
            description: '数据可视化与分析工具，帮助用户更直观地理解和处理复杂的数据集。',
            icon: 'ri-bar-chart-box-line',
            tags: ['Python', 'D3.js', 'Flask'],
            github: '#',
            demo: '#'
        },
        {
            title: 'API Service',
            description: '高性能RESTful API服务，支持高并发访问，提供完整的文档和测试接口。',
            icon: 'ri-server-line',
            tags: ['Node.js', 'Express', 'PostgreSQL'],
            github: '#',
            demo: '#'
        },
        {
            title: 'CLI Tools',
            description: '实用的命令行工具，提高开发效率，自动化日常任务，支持多平台运行。',
            icon: 'ri-terminal-line',
            tags: ['Node.js', 'Commander.js'],
            github: '#',
            demo: '#'
        },
        {
            title: 'Mobile App',
            description: '跨平台移动应用，支持iOS和Android，原生性能与Web开发效率的完美结合。',
            icon: 'ri-smartphone-line',
            tags: ['React Native', 'Redux'],
            github: '#',
            demo: '#'
        },
        {
            title: 'Open Source Contribution',
            description: '积极参与开源社区，为多个流行项目贡献代码，解决真实世界的问题。',
            icon: 'ri-open-source-line',
            tags: ['Git', 'GitHub', 'Collaboration'],
            github: '#',
            demo: '#'
        }
    ];
    
    // Render projects
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsContainer.appendChild(projectCard);
    });
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.style.setProperty('--delay', `${index * 0.1}s`);
    
    card.innerHTML = `
        <div class="project-thumbnail">
            <i class="${project.icon}"></i>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link github">
                    <i class="ri-github-fill"></i>
                    Code
                </a>
                <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link demo">
                    <i class="ri-external-link-line"></i>
                    Demo
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation on Scroll =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Parallax Effect for Hero Background =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===== Add loading animation to images =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});

// ===== Keyboard Navigation Support =====
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    }
});

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    
    return function() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// ===== Intersection Observer Polyfill Check =====
if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    const elements = document.querySelectorAll('.fade-in, .skill-progress, .stat-number');
    
    elements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
}

console.log('Laurent Zhu Portfolio loaded successfully! 🚀');
