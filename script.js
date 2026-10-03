// ============================================
// Alex Chen — Personal Profile
// Modern vanilla JS, no dependencies
// ============================================

(function() {
  'use strict';

  // ---------- Nav: hide on scroll down, show on scroll up ----------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      nav.classList.remove('hidden');
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll(
    '.about-text, .about-facts, .skill-card, .work-item, .writing-card, .contact-title, .contact-sub, .contact-email, .contact-socials'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Smooth scroll for nav links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Parallax on hero title ----------
  const heroTitle = document.querySelector('.hero-title');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
          heroTitle.style.transform = `translateY(${scrolled * 0.15}px)`;
          heroTitle.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ---------- Work item stagger on scroll ----------
  const workItems = document.querySelectorAll('.work-item');
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        workObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  workItems.forEach(item => workObserver.observe(item));

  // ---------- Dynamic year in footer ----------
  const footerYear = document.querySelector('.footer span');
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} Alex Chen`;
  }

  // ---------- Console easter egg ----------
  console.log(
    '%cHey there! 👋\n%cLike what you see? Let\'s work together.\nhello@alexchen.design',
    'font-size: 1.2rem; font-weight: bold; color: #C4532E;',
    'font-size: 0.9rem; color: #6B6560;'
  );

})();
