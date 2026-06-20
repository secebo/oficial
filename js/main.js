/* SECE v4 - Interacciones front-end optimizadas */

document.documentElement.classList.add('js');

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

let certificatesCache = null;

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initHomeHeader();
  initReveal();
  initNewsCarousel();
  initFilters();
  initCertificates();
  initForum();
});

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function initMenu() {
  const toggle = $('#menuToggle');
  const nav = $('#mainNav');
  const shell = $('.nav-shell');
  if (!toggle || !nav || !shell) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open') || shell.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function initHomeHeader() {
  const header = $('#siteHeader');
  const hero = $('.home-page .hero');
  if (!header || !document.body.classList.contains('home-page')) return;

  const updateHeader = () => {
    const threshold = hero ? Math.max(80, hero.offsetHeight - header.offsetHeight) : 80;
    header.classList.toggle('scrolled', window.scrollY > threshold);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
}

function initReveal() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  elements.forEach((element) => observer.observe(element));
}

function initNewsCarousel() {
  const carousel = $('#newsCarousel');
  const slides = $$('.news-slide', carousel || document);
  const next = $('#nextNews');
  const prev = $('#prevNews');
  if (!carousel || slides.length <= 1 || !next || !prev) return;

  let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
  let timerId = null;

  const show = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
  };

  const stop = () => {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = null;
  };

  const start = () => {
    if (prefersReducedMotion() || document.hidden) return;
    stop();
    timerId = window.setInterval(() => show(index + 1), 6500);
  };

  const go = (direction) => {
    stop();
    show(index + direction);
    start();
  };

  next.addEventListener('click', () => go(1));
  prev.addEventListener('click', () => go(-1));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  show(index);
  start();
}

function initFilters() {
  const filterButtons = $$('[data-filter]');
  const searchableCards = $$('[data-category]');
  const filterGroups = $$('[data-filter-group]');
  const searchInput = $('#publicationSearch');
  if (!filterButtons.length && !searchInput) return;

  let activeFilter = $('.filter-btn.active')?.dataset.filter || 'all';

  const apply = () => {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    filterButtons.forEach((button) => {
      button.setAttribute('type', 'button');
      button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
    });

    searchableCards.forEach((card) => {
      const category = card.dataset.category || '';
      const text = card.textContent.toLowerCase();
      const matchFilter = activeFilter === 'all' || category === activeFilter;
      const matchSearch = !query || text.includes(query);
      card.classList.toggle('hidden-card', !(matchFilter && matchSearch));
    });

    filterGroups.forEach((group) => {
      const category = group.dataset.filterGroup || '';
      group.hidden = activeFilter !== 'all' && category !== activeFilter;
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter || 'all';
      apply();
    });
  });

  if (searchInput) searchInput.addEventListener('input', apply);
  apply();
}

async function loadCertificates() {
  if (certificatesCache) return certificatesCache;
  const response = await fetch('data/certificates.json');
  if (!response.ok) throw new Error('No se pudo cargar el registro.');
  certificatesCache = await response.json();
  return certificatesCache;
}

function initCertificates() {
  const form = $('#certificateForm');
  const input = $('#certificateCode');
  const result = $('#certificateResult');
  const preview = $('#certificatePreview');
  if (!form || !input || !result) return;

  result.setAttribute('role', 'status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const code = input.value.trim();
    if (!code) return;

    result.classList.add('show');
    result.innerHTML = '<p>Buscando certificado...</p>';

    try {
      const data = await loadCertificates();
      if (!Array.isArray(data) || data.length === 0) {
        result.innerHTML = '<h3>Próximamente</h3><p>La verificación de certificados estará habilitada próximamente.</p>';
        if (preview) preview.innerHTML = '<h2>Vista previa</h2><p class="lead">Si el código es válido, aparecerá aquí el certificado.</p>';
        return;
      }

      const cert = data.find((item) => item.code.toLowerCase() === code.toLowerCase());

      if (!cert) {
        result.innerHTML = '<h3>Próximamente</h3><p>La verificación de certificados estará habilitada próximamente.</p>';
        if (preview) preview.innerHTML = '<h2>Vista previa</h2><p class="lead">Si el código es válido, aparecerá aquí el certificado.</p>';
        return;
      }

      if (cert.status && cert.status.toLowerCase() === 'revocado') {
        result.innerHTML = `<h3>Certificado revocado</h3><p>El código existe, pero actualmente figura como revocado.</p><span class="code-pill">${escapeHTML(cert.code)}</span>`;
        if (preview) preview.innerHTML = '';
        return;
      }

      result.innerHTML = `
        <h3>Certificado válido</h3>
        <p><strong>Código:</strong> ${escapeHTML(cert.code)}</p>
        <p><strong>Nombre:</strong> ${escapeHTML(cert.name)}</p>
        <p><strong>Actividad:</strong> ${escapeHTML(cert.event)}</p>
        <p><strong>Fecha:</strong> ${escapeHTML(cert.date)}</p>
        <p><strong>Tipo:</strong> ${escapeHTML(cert.type)}</p>
        <span class="code-pill">Verificado por SECE</span>
      `;

      if (preview) {
        preview.innerHTML = `
          <h3>Vista previa del certificado</h3>
          <p class="lead">Certificado verificado por SECE.</p>
          <img src="${escapeHTML(cert.image)}" alt="Certificado ${escapeHTML(cert.code)}" loading="lazy" decoding="async">
        `;
      }
    } catch (error) {
      result.innerHTML = '<h3>Error de lectura</h3><p>No se pudo cargar el registro.</p>';
      console.error(error);
    }
  });
}

function initForum() {
  const carousels = $$('[data-topic-carousel]');
  if (!carousels.length) return;

  carousels.forEach((carousel, carouselIndex) => {
    const slides = $$('.topic-slide', carousel);
    const previous = $('[data-topic-prev]', carousel);
    const next = $('[data-topic-next]', carousel);
    const dots = $('.topic-dots', carousel);
    if (!slides.length || !previous || !next || !dots) return;

    let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
    let timerId = null;

    dots.innerHTML = slides.map((_, slideIndex) => (
      `<button type="button" data-topic-dot="${slideIndex}" aria-label="Ver imagen ${slideIndex + 1}"></button>`
    )).join('');

    const dotButtons = $$('[data-topic-dot]', dots);

    const show = (newIndex) => {
      index = (newIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === index;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      dotButtons.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
        dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
      });
    };

    const stop = () => {
      if (!timerId) return;
      window.clearInterval(timerId);
      timerId = null;
    };

    const start = () => {
      if (prefersReducedMotion() || document.hidden || slides.length < 2) return;
      stop();
      timerId = window.setInterval(() => show(index + 1), 5600 + (carouselIndex * 500));
    };

    const go = (newIndex) => {
      stop();
      show(newIndex);
      start();
    };

    previous.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => go(index + 1));
    dotButtons.forEach((dot) => {
      dot.addEventListener('click', () => go(Number(dot.dataset.topicDot || 0)));
    });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    show(index);
    start();
  });
}
