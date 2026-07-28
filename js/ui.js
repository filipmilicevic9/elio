/* =====================================================
   ELIO — ui.js
   UI interakcije: kontakt forma (demo) i video placeholder.
   ===================================================== */

/* ---------- kontakt forma (demo) ---------- */
document.getElementById('sendBtn').addEventListener('click', () => {
  const form = document.getElementById('contactForm');
  if (!form.reportValidity()) return;
  document.getElementById('formStatus').style.display = 'block';
  form.reset();
});

/* ---------- video placeholder(i) ---------- */
const openVideo = () => {
  /* Ovde ubaciti pravi video (YouTube/Vimeo embed ili <video> tag). */
  alert('Ovde ide video demonstracija — zameni ovaj placeholder pravim snimkom uređaja.');
};
document.querySelectorAll('.video-shell').forEach(videoShell => {
  videoShell.addEventListener('click', openVideo);
  videoShell.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(); } });
});
