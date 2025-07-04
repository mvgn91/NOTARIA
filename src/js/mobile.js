// Funcionalidad específica para el micrositio móvil
(function() {
    'use strict';
    
    // Elementos del DOM
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const testimonialCards = document.querySelectorAll('.mobile-testimonial-card');
    const testimonialDots = document.querySelectorAll('.mobile-testimonials__dot');
    
    // Variables del slider
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;
    
    // Menú móvil
    function toggleMobileMenu() {
        mobileNav.classList.toggle('show');
        
        // Cambiar icono del botón
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileNav.classList.contains('show')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
    
    // Cerrar menú al hacer clic en un enlace
    function closeMobileMenu() {
        mobileNav.classList.remove('show');
        const icon = mobileMenuToggle.querySelector('i');
        icon.className = 'fas fa-bars';
    }
    
    // Slider de testimonios
    function showSlide(index) {
        // Ocultar todas las tarjetas
        testimonialCards.forEach(card => {
            card.classList.remove('mobile-testimonial-card--active');
        });
        
        // Desactivar todos los dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('mobile-testimonials__dot--active');
        });
        
        // Mostrar la tarjeta actual
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('mobile-testimonial-card--active');
        }
        
        // Activar el dot actual
        if (testimonialDots[index]) {
            testimonialDots[index].classList.add('mobile-testimonials__dot--active');
        }
        
        currentSlide = index;
    }
    
    // Auto-slide de testimonios
    function autoSlide() {
        const nextSlide = (currentSlide + 1) % totalSlides;
        showSlide(nextSlide);
    }
    
    // Navegación suave para enlaces internos
    function smoothScroll(e) {
        const targetId = e.target.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 80; // Altura del header fijo
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
            }
        }
    }
    
    // Event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer clic en enlaces
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Slider de testimonios
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-slide cada 5 segundos
    if (totalSlides > 1) {
        setInterval(autoSlide, 5000);
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Animaciones al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.mobile-service-card, .mobile-contact-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar animaciones
    function initAnimations() {
        const elements = document.querySelectorAll('.mobile-service-card, .mobile-contact-card');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Ejecutar animación inicial
        setTimeout(animateOnScroll, 100);
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
    
    // Función para detectar si el usuario está en móvil
    function isMobileUser() {
        return window.innerWidth <= 768;
    }
    
    // Redirigir a desktop si el usuario cambia el tamaño de ventana
    window.addEventListener('resize', () => {
        if (!isMobileUser() && window.location.pathname.includes('/mobile/')) {
            // Si la ventana se hace más grande y estamos en móvil, redirigir a desktop
            window.location.href = '/';
        }
    });
    
})(); 