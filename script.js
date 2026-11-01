/* =========================================
   INFLUWEB - LANDING PREMIUM SCRIPTS
   Autor: Diego (Diseño web)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- SCROLL REVEAL (Intersection Observer, sin librerías) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Solo animar una vez
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores muy antiguos
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // --- HEADER STICKY CON SOMBRA AL HACER SCROLL ---
  const header = document.querySelector('.header');
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Estado inicial
  }

  // --- MENÚ MÓVIL (Hamburger) ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open'); // Prevenir scroll del body
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // --- SCROLL SUAVE PARA ENLACES INTERNOS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- VALIDACIÓN BÁSICA DE FORMULARIO ---
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        // Limpiar estados previos
        input.style.borderColor = '';
        
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#EF4444'; // Rojo de error temporal
          
          // Quitar el borde rojo al interactuar
          input.addEventListener('input', function handler() {
            this.style.borderColor = '';
            this.removeEventListener('input', handler);
          });
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Opcional: enfocar el primer campo inválido
        const firstInvalid = form.querySelector('input[required]:invalid, textarea[required]:invalid, input[style*="border-color"]');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

});