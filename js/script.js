// =========================================================
// Valerio Malagoli — Portfolio (single-page versie)
// Shared interactivity
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* Scrollspy — markeer het navigatie-item van de sectie die
     nu in beeld is als actief, terwijl je over de pagina scrollt. */
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');
  const sections = Array.from(navLinks)
    .map(a => document.getElementById(a.dataset.section))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) => {
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === id));
    };

    const spy = new IntersectionObserver((entries) => {
      // Kies de sectie die het hoogst in beeld is, voor een stabiele actieve status.
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length) {
        const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        setActive(top.target.id);
      }
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(sec => spy.observe(sec));
    setActive(sections[0].id);
  }

  /* Scroll-triggered reveal animations */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact form — front-end only voor nu.
     Geen backend gekoppeld. Dit opent de mail-app van de
     bezoeker met de ingevulde gegevens al klaargezet.
     Wil je een écht werkend formulier (zonder mail-app),
     koppel dan later een service zoals Formspree, EmailJS,
     of je eigen PHP-mailscript (dat heb je al gebruikt bij
     je Vinyl Website project). */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.naam.value.trim();
      const email = form.email.value.trim();
      const message = form.bericht.value.trim();

      const subject = encodeURIComponent(`Portfolio contact van ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:valeriomalagoli08@gmail.com?subject=${subject}&body=${body}`;

      const status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Je mail-app wordt geopend met je bericht klaargezet.';
        status.classList.add('show');
      }
    });
  }

});
