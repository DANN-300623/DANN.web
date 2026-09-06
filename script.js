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
