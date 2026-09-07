  /* ---------- MOBILE MENU ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burgerBtn && mobileMenu) {
    function openMobileMenu(){
      mobileMenu.classList.add('open');
      burgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu(){
      mobileMenu.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    burgerBtn.addEventListener('click', openMobileMenu);
    if (closeMenuBtn) { closeMenuBtn.addEventListener('click', closeMobileMenu); }
    mobileMenu.querySelectorAll('.mnav-link').forEach(function(a){
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- SCROLL REVEAL + SEKVENCIJALNO POJAVLJIVANJE ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- SUPTILAN PARALLAX NA HERO SADRŽAJU ---------- */
  const heroInner = document.querySelector('.hero .container');
  if (heroInner && !prefersReducedMotion) {
    window.addEventListener('scroll', function(){
      const y = window.scrollY;
      if (y < 700) {
        heroInner.style.transform = 'translateY(' + (y * 0.12) + 'px)';
      }
    }, { passive: true });
  }

  /* ---------- KONTAKT FORMA ---------- */
  const formCheck = document.getElementById('contactForm');
  if (formCheck) {
    const form = document.getElementById('contactForm');
    const confirmationMsg = document.getElementById('confirmationMsg');

    // Nakon što deployuješ kontakt-apps-script.gs kao Web app,
    // nalepi tu adresu ovde (Deploy → New deployment → Web app → kopiraj URL).
    const SCRIPT_URL = 'PASTE_TVOJ_APPS_SCRIPT_WEB_APP_URL_OVDE';

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const fd = new FormData();
      fd.append('name', document.getElementById('ime').value);
      fd.append('email', document.getElementById('email').value);
      fd.append('phone', document.getElementById('telefon').value);
      fd.append('projectType', document.getElementById('tip').value);
      fd.append('message', document.getElementById('poruka').value);

      fetch(SCRIPT_URL, { method: 'POST', body: fd })
        .then(function(){
          confirmationMsg.textContent = 'Hvala na poruci! Javljam se uskoro na naveden kontakt.';
          confirmationMsg.style.display = 'block';
          form.reset();
          confirmationMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function(){
          confirmationMsg.textContent = 'Došlo je do greške — probaj ponovo ili piši direktno na hello@dannweb.rs';
          confirmationMsg.style.display = 'block';
        });
    });
  }
