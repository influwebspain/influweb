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
          svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
          // Icono Hamburguesa
          svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
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
          svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
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
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle actual
      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = inner.scrollHeight + 24 + 'px';
        question.setAttribute('aria-expanded', 'true');
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

  /* ------------------------------------------------------------------------
     6. Micro-interacción CTA: ripple light
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('pointerdown', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.borderRadius = '999px';
      ripple.style.background = 'rgba(0,229,160,.22)';
      ripple.style.pointerEvents = 'none';
      ripple.style.opacity = '1';
      ripple.style.transition = 'transform .35s ease, opacity .35s ease';
      ripple.className = 'ripple';

      btn.style.position = btn.style.position || 'relative';
      btn.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(18)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 380);
    });
  });

});
