  const formCheck = document.getElementById('contactForm');
  if (formCheck) {
    const form = document.getElementById('contactForm');
    const confirmationMsg = document.getElementById('confirmationMsg');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Demo verzija - ovde bi u pravom sajtu išao servis za slanje
      // (npr. Formspree, ili Google Apps Script kao kod Latice/Stil)
      confirmationMsg.style.display = 'block';
      form.reset();
      confirmationMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
