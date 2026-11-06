/* ==========================================================================
   INFLUWEB — Landing Premium JS
   Proyecto: landing-premium
   Autor: Diego (Diseño web y landing pages)
   Fecha: 2026-11-06
   Cliente: INFLUWEB
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. MENÚ HAMBURGUESA RESPONSIVE
     ------------------------------------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. SCROLL REVEAL (IntersectionObserver)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Solo animar una vez
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores sin soporte
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ------------------------------------------------------------------------
     3. FAQ ACCORDION
     ------------------------------------------------------------------------ */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Cerrar todos los demás
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
          const activeAnswer = activeItem.querySelector('.faq-answer');
          activeAnswer.style.maxHeight = null;
          activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Abrir/cerrar el actual
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. NAVBAR SCROLL EFFECT (Opcional: oscurecer más al bajar)
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        navbar.style.backgroundColor = 'rgba(14, 16, 15, 0.92)';
      } else {
        navbar.style.backgroundColor = 'rgba(14, 16, 15, 0.75)';
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

});