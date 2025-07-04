// Detección automática de dispositivos móviles
(function() {
    'use strict';
    
    // Función para detectar si es dispositivo móvil
    function isMobileDevice() {
        return (
            window.innerWidth <= 768 || 
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
    }
    
    // Función para redirigir a versión móvil
    function redirectToMobile() {
        if (!sessionStorage.getItem('desktopMode')) {
            window.location.href = '/mobile/';
        }
    }
    
    // Función para mostrar versión desktop
    function showDesktopVersion() {
        sessionStorage.setItem('desktopMode', 'true');
        window.location.href = '/';
    }
    
    // Función para mostrar versión móvil
    function showMobileVersion() {
        sessionStorage.removeItem('desktopMode');
        window.location.href = '/mobile/';
    }
    
    // Detectar y redirigir automáticamente
    if (isMobileDevice() && window.location.pathname === '/') {
        redirectToMobile();
    }
    
    // Exponer funciones globalmente
    window.MobileDetector = {
        showDesktop: showDesktopVersion,
        showMobile: showMobileVersion,
        isMobile: isMobileDevice
    };
    
})(); 