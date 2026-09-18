# DANN.web.workshop — kontakt forma, podešavanje

Prava kontakt forma sajta (kontakt.html), povezana sa Google Apps Script backend-om.

## Šta radi

- Prima podatke iz forme (ime, email, telefon, tip projekta, poruka)
- Upisuje svaki upit kao red u Google Sheet (tab "Upiti") — trajna evidencija
- Šalje TEBI email obaveštenje za svaki novi upit
- Šalje pošiljaocu automatski kratak odgovor "primili smo tvoj upit"

## Setup (jednom)

1. Napravi novi Google Sheet (sheets.new)
2. Preimenuj prvi tab u "Upiti"
3. U prvi red upiši zaglavlja: `Datum | Ime | Email | Telefon | Tip projekta | Poruka`
4. Extensions → Apps Script, nalepi ceo sadržaj `kontakt-apps-script.gs`
5. Zameni `NOTIFY_EMAIL` i `REPLY_FROM` na vrhu fajla svojim podacima
6. **Važno**: `hello@dannweb.rs` (ili koji god email koristiš kao REPLY_FROM) mora biti dodat kao "Send As" alias u Gmail-u (Gmail → Settings → Accounts and Import → Send mail as) — bez toga slanje neće raditi
7. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
8. Kopiraj Web app URL
9. U `script.js`, pronađi `const SCRIPT_URL = 'PASTE_TVOJ_APPS_SCRIPT_WEB_APP_URL_OVDE';` i zameni svojim URL-om
10. Prvi test će tražiti odobrenje dozvola u Google-u — to je normalno, samo odobri

## Napomena

Ovo NIJE demo — ovo je prava forma za pravi biznis, sa pravim čuvanjem podataka u Sheet-u. Za razliku od demo sajtova (koji samo šalju mejl bez čuvanja), ovde se svaki upit trajno beleži radi praćenja.
