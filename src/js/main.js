// Navegación móvil
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Cerrar menú al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Slider del hero
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero__slide');
        this.controls = document.querySelectorAll('.hero__control');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Mostrar primera slide
        this.showSlide(0);
        
        // Event listeners para controles
        this.controls.forEach((control, index) => {
            control.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Auto-play
        this.startAutoPlay();
        
        // Pausar en hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.stopAutoPlay());
            heroSection.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    showSlide(index) {
        // Remover clase active de todas las slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.controls.forEach(control => control.classList.remove('active'));
        
        // Activar slide actual
        this.slides[index].classList.add('active');
        this.controls[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    goToSlide(index) {
        this.showSlide(index);
        this.restartAutoPlay();
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Navegación activa para páginas múltiples
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(246, 243, 235, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--secondary-color)';
        header.style.backdropFilter = 'none';
    }
}

// Animaciones de scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .service-card, .about__text, .contact__item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Smooth scroll para enlaces internos (solo en la misma página)
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contador animado para estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card__number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                // Restaurar formato original
                const originalText = counter.textContent;
                if (originalText.includes('+')) {
                    counter.textContent = '+' + target.toLocaleString();
                } else if (originalText.includes('%')) {
                    counter.textContent = target + '%';
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        
        // Iniciar animación cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar navegación activa
    updateActiveNavLink();
    
    // Inicializar slider solo si existe
    if (document.querySelector('.hero__slide')) {
        new HeroSlider();
    }
    
    // Inicializar smooth scroll
    initSmoothScroll();
    
    // Inicializar contadores solo si existen
    if (document.querySelector('.stat-card__number')) {
        animateCounters();
    }
    
    // Event listeners para scroll
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        animateOnScroll();
    });
    
    // Configurar estilos iniciales para animaciones
    const animatedElements = document.querySelectorAll('.stat-card, .service-card, .about__text, .contact__item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger inicial
    animateOnScroll();
});

// Manejo de errores para imágenes
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Error loading image: ${this.src}`);
            // Opcional: mostrar imagen placeholder
            this.style.display = 'none';
        });
    });
});