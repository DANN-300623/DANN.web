/**
 * DANN.web.workshop — kontakt forma → Google Sheet + auto-odgovor klijentu
 *
 * Šta radi:
 * - Prima podatke poslate iz kontakt.html forme (POST) — email obavezan, telefon opciono
 * - Upisuje ih kao novi red u Google Sheet (tab "Upiti")
 * - Šalje TEBI email obaveštenje za svaki novi upit
 * - Šalje klijentu automatski kratak odgovor "primili smo tvoj upit" —
 *   sa hello@dannweb.rs kao pošiljaocem (ne sa tvog Gmail naloga)
 *
 * Podešavanje (jednom):
 * 1. Napravi novi Google Sheet (sheets.new)
 * 2. Preimenuj prvi tab u "Upiti"
 * 3. U prvi red upiši zaglavlja: Datum | Ime | Email | Telefon | Tip projekta | Poruka
 * 4. Extensions → Apps Script
 * 5. Obriši sadržaj koji tamo stoji, nalepi ovaj ceo fajl
 * 6. Zameni NOTIFY_EMAIL i REPLY_FROM ispod svojim podacima
 * 7. VAŽNO: hello@dannweb.rs mora biti dodat kao "Send As" alias u Gmail-u
 *    (Gmail → Settings → Accounts and Import → Send mail as) — bez toga
 *    REPLY_FROM neće raditi.
 * 8. Deploy → New deployment → tip "Web app"
 *      Execute as: Me
 *      Who has access: Anyone
 * 9. Kopiraj URL koji dobiješ (Web app URL) — to je adresa koju stavljaš u kontakt.html
 * 10. Prvi put kad testiraš, Google će tražiti da odobriš dozvole — to je normalno.
 */

const NOTIFY_EMAIL = 'hello@dannweb.rs'; // <-- gde TI dobijaš obaveštenje
const REPLY_FROM = 'hello@dannweb.rs';   // <-- mora biti verifikovan Send As alias
const SHEET_NAME = 'Upiti';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const phone = e.parameter.phone || '';
    const projectType = e.parameter.projectType || '';
    const message = e.parameter.message || '';

    sheet.appendRow([new Date(), name, email, phone, projectType, message]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'Novi upit sa sajta — ' + (name || 'nepoznato ime'),
        body:
          'Ime: ' + name + '\n' +
          'Email: ' + email + '\n' +
          'Telefon: ' + (phone || '(nije unet)') + '\n' +
          'Tip projekta: ' + projectType + '\n\n' +
          'Poruka:\n' + message
      });
    }

    // Email je sad obavezno polje, pa auto-odgovor uvek ide na njega.
    if (email) {
      MailApp.sendEmail({
        to: email,
        from: REPLY_FROM,
        name: 'DANN.web.workshop',
        subject: 'Primili smo tvoj upit',
        body:
          'Ćao' + (name ? ' ' + name : '') + ',\n\n' +
          'Hvala na upitu — javljam se u najkraćem roku sa odgovorom.\n\n' +
          'Ako je hitno, slobodno piši direktno na ' + REPLY_FROM + '.\n\n' +
          'Pozdrav,\nDANN.web.workshop'
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Samo da možeš da otvoriš Web app URL u browseru i vidiš da script "živi",
// bez ovoga bi GET zahtev vratio grešku.
function doGet(e) {
  return ContentService.createTextOutput('Kontakt forma script radi. Koristi POST za slanje podataka.');
}
