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

// Gallery Slider Class
class GallerySlider {
    constructor(sliderId) {
        this.slider = document.getElementById(sliderId);
        if (!this.slider) return;
        
        this.slides = this.slider.querySelectorAll('.gallery-slider__slide');
        this.indicators = this.slider.querySelectorAll('.gallery-slider__indicator');
        this.prevBtn = this.slider.querySelector('.gallery-slider__btn--prev');
        this.nextBtn = this.slider.querySelector('.gallery-slider__btn--next');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Event listeners para botones
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Event listeners para abrir modal al hacer click en imagen
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', (e) => {
                const img = slide.querySelector('.gallery-slider__img');
                if (img) {
                    openImageModal(img, this.getAllImages(), index);
                }
            });
        });
        
        // Mostrar primera slide
        this.showSlide(0);
    }
    
    showSlide(index) {
        // Remover clase active
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Activar slide actual
        this.slides[index].classList.add('active');
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }
    
    getAllImages() {
        return Array.from(this.slides).map(slide => {
            const img = slide.querySelector('.gallery-slider__img');
            return {
                src: img.src,
                alt: img.alt
            };
        });
    }
}

// Image Modal functionality con animación mejorada
let currentModalImages = [];
let currentModalIndex = 0;

function openImageModal(clickedImg, images = [], index = 0) {
    const modal = document.getElementById('image-modal');
    const modalImg = modal.querySelector('.image-modal__img');
    
    currentModalImages = images.length > 0 ? images : [{ src: clickedImg.src, alt: clickedImg.alt }];
    currentModalIndex = index;
    
    // Obtener posición y tamaño de la imagen original
    const rect = clickedImg.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Configurar imagen del modal
    modalImg.src = clickedImg.src;
    modalImg.alt = clickedImg.alt;
    
    // Configurar posición inicial del modal (donde está la imagen original)
    const modalContent = modal.querySelector('.image-modal__content');
    modalContent.style.position = 'fixed';
    modalContent.style.top = rect.top + 'px';
    modalContent.style.left = rect.left + 'px';
    modalContent.style.width = rect.width + 'px';
    modalContent.style.height = rect.height + 'px';
    modalContent.style.transform = 'scale(1)';
    modalContent.style.opacity = '1';
    
    // Mostrar modal
    modal.classList.add('active');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Animar a la posición final después de un frame
    requestAnimationFrame(() => {
        modalContent.style.position = 'relative';
        modalContent.style.top = 'auto';
        modalContent.style.left = 'auto';
        modalContent.style.width = 'auto';
        modalContent.style.height = 'auto';
        modalContent.style.maxWidth = '90vw';
        modalContent.style.maxHeight = '90vh';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    });
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    const modalContent = modal.querySelector('.image-modal__content');
    
    // Animar salida
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.remove('active');
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }, 300);
}

function showModalImage(index) {
    if (index < 0 || index >= currentModalImages.length) return;
    
    const modal = document.getElementById('image-modal');
    const modalImg = modal.querySelector('.image-modal__img');
    const modalContent = modal.querySelector('.image-modal__content');
    
    // Animación de transición
    modalContent.style.opacity = '0.7';
    modalContent.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        currentModalIndex = index;
        modalImg.src = currentModalImages[index].src;
        modalImg.alt = currentModalImages[index].alt;
        
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 150);
}

function nextModalImage() {
    const nextIndex = (currentModalIndex + 1) % currentModalImages.length;
    showModalImage(nextIndex);
}

function prevModalImage() {
    const prevIndex = (currentModalIndex - 1 + currentModalImages.length) % currentModalImages.length;
    showModalImage(prevIndex);
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
    const elements = document.querySelectorAll('.stat-card, .service-card, .about__text, .contact__item, .installations__text');
    
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

// Testimonios slider
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-slider__track');
    const slides = Array.from(document.querySelectorAll('.testimonial-card--slide'));
    const prevBtn = document.querySelector('.testimonials-slider__arrow--prev');
    const nextBtn = document.querySelector('.testimonials-slider__arrow--next');
    const dotsContainer = document.querySelector('.testimonials-slider__dots');
    let current = 0;
    let interval = null;

    function goToSlide(idx) {
        current = (idx + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            if (i === current) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        updateDots();
    }

    function nextSlide() {
        goToSlide(current + 1);
    }

    function prevSlide() {
        goToSlide(current - 1);
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = 'testimonials-slider__dot' + (idx === current ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    function startAuto() {
        interval = setInterval(nextSlide, 6000);
    }
    function stopAuto() {
        clearInterval(interval);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAuto(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAuto(); startAuto(); });

    goToSlide(0);
    updateDots();
    startAuto();

    // Pausar en hover
    if (track) {
        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar navegación activa
    updateActiveNavLink();
    
    // Inicializar slider solo si existe
    if (document.querySelector('.hero__slide')) {
        new HeroSlider();
    }
    
    // Inicializar gallery sliders
    new GallerySlider('history-slider');
    new GallerySlider('installations-slider');
    
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
    const animatedElements = document.querySelectorAll('.stat-card, .service-card, .about__text, .contact__item, .installations__text');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger inicial
    animateOnScroll();
    
    // Event listeners para el modal de imágenes
    const modal = document.getElementById('image-modal');
    if (modal) {
        // Cerrar modal al hacer click en overlay
        const overlay = modal.querySelector('.image-modal__overlay');
        if (overlay) {
            overlay.addEventListener('click', closeImageModal);
        }
        
        // Cerrar modal con botón de cerrar
        const closeBtn = modal.querySelector('.image-modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeImageModal);
        }
        
        // Navegación en modal
        const prevBtn = modal.querySelector('.image-modal__btn--prev');
        const nextBtn = modal.querySelector('.image-modal__btn--next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevModalImage);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextModalImage);
        }
        
        // Cerrar modal con tecla Escape y navegación con flechas
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeImageModal();
            }
            if (e.key === 'ArrowLeft' && modal.classList.contains('active')) {
                prevModalImage();
            }
            if (e.key === 'ArrowRight' && modal.classList.contains('active')) {
                nextModalImage();
            }
        });
    }
    initTestimonialsSlider();
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

// Animación de timeline interactivo en misión, visión y valores
function animateTimelineOnScroll() {
    const items = document.querySelectorAll('.timeline-item[data-animate]');
    const trigger = window.innerHeight * 0.85;
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < trigger && rect.bottom > 0) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', animateTimelineOnScroll);
window.addEventListener('DOMContentLoaded', animateTimelineOnScroll);

// =========================
// Scroll horizontal premium catálogo (solo escritorio)
// =========================
(function() {
  const carousel = document.getElementById('servicesCarousel');
  if (!carousel) return;

  // Solo activar en escritorio
  function isDesktop() {
    return window.innerWidth > 900;
  }

  // Scroll suave con wheel horizontal
  function handleWheel(e) {
    if (!isDesktop()) return;
    if (e.deltaY === 0) return;
    e.preventDefault();
    carousel.scrollBy({
      left: e.deltaY * 1.2, // Ajusta la sensibilidad
      behavior: 'smooth'
    });
  }

  // Snap al centro al terminar de hacer scroll
  let isSnapping = false;
  function snapToCard() {
    if (!isDesktop() || isSnapping) return;
    isSnapping = true;
    // Encuentra la tarjeta más centrada
    const cards = Array.from(carousel.querySelectorAll('.service-card'));
    const carouselRect = carousel.getBoundingClientRect();
    const center = carouselRect.left + carouselRect.width / 2;
    let minDist = Infinity, snapCard = null;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        snapCard = card;
      }
    });
    if (snapCard) {
      const cardRect = snapCard.getBoundingClientRect();
      const scrollLeft = carousel.scrollLeft + (cardRect.left + cardRect.width/2 - center);
      carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
    setTimeout(() => { isSnapping = false; }, 500);
  }

  // Solo en escritorio
  function enableHorizontalScroll() {
    if (isDesktop()) {
      carousel.addEventListener('wheel', handleWheel, { passive: false });
      carousel.addEventListener('scroll', debounce(snapToCard, 120));
    } else {
      carousel.removeEventListener('wheel', handleWheel);
      carousel.removeEventListener('scroll', debounce(snapToCard, 120));
    }
  }

  // Debounce helper
  function debounce(fn, ms) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // Inicializar
  enableHorizontalScroll();
  window.addEventListener('resize', enableHorizontalScroll);
})();