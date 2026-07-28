/* =====================================================
   ELIO — helpers.js
   Pomoćne funkcije za animaciju procesa (koraci + LCD tekst).
   Koristi ih animations.js.
   ===================================================== */

/* Koraci procesa (1–6) pored animacije */
const steps = document.querySelectorAll('#processSteps .p-step');
const setStep = i => steps.forEach((s, idx) => s.classList.toggle('active', idx === i));

/* Tekst na LCD ekranu uređaja u animaciji */
const lcd = document.getElementById('lcdText');
const setLcd = t => { lcd.textContent = t; };
