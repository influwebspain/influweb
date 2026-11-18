/* ==========================================================================
   INFLUWEB — Landing Premium v2
   Script principal: Navbar, FAQ, Animaciones
   Autor: Diego (Diseño web)
   Fecha: 2026-11-06
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. MENÚ HAMBURGUESA (MOBILE)
     ------------------------------------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);

      // Cambiar icono del botón
      const svg = hamburger.querySelector('svg');
      if (svg) {
        if (isOpen) {
          // Icono X
          svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>';
        } else {
          // Icono Hamburguesa
          svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>';
        }
      }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        const svg = hamburger.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>';
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. FAQ ACORDEÓN
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');

    if (!question || !answer || !inner) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Cerrar todos los demás
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      // Toggle actual
      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = inner.scrollHeight + 24 + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------------
     3. ANIMACIONES DE SCROLL (Intersection Observer)
     ------------------------------------------------------------------------ */
  const animateElements = document.querySelectorAll(
    '.benefit-card, .build-card, .step-card, .audience-item, .about-content, .contact-grid'
  );

  // Añadir clase base para ocultar antes de animar
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: mostrar todo si no hay soporte
    animateElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  /* ------------------------------------------------------------------------
     4. REINICIAR ANIMACIÓN TARJETA FLUJO AL HACER SCROLL
     ------------------------------------------------------------------------ */
  const flowCard = document.querySelector('.flow-card');
  if (flowCard && 'IntersectionObserver' in window) {
    const flowRows = flowCard.querySelectorAll('.flow-row');

    const flowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          flowRows.forEach(row => {
            row.style.animation = 'none';
            // Forzar reflow
            void row.offsetHeight;
            row.style.animation = '';
          });
        }
      });
    }, { threshold: 0.3 });

    flowObserver.observe(flowCard);
  }

  /* ------------------------------------------------------------------------
     5. SMOOTH SCROLL PARA ENLACES INTERNOS
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 68;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 24;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
