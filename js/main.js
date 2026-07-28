/* =====================================================
   ELIO — main.js
   Globalno ponašanje stranice: stanje headera pri skrolu.
   ===================================================== */

/* Header dobija staklenu pozadinu čim se stranica pomeri */
const siteHeader = document.getElementById('siteHeader');
const onScrollHeader = () => siteHeader.classList.toggle('scrolled', window.scrollY > 24);
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, {passive:true});
