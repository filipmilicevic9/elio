/* =====================================================
   ELIO — navigation.js
   Mobilna navigacija: hamburger meni, otvaranje/zatvaranje
   i automatsko zatvaranje na klik linka.
   ===================================================== */

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const lockScroll = open => {
  document.documentElement.classList.toggle('nav-open', open);
  document.body.classList.toggle('nav-open', open);
};
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  lockScroll(open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
  const href = a.getAttribute('href');
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
  lockScroll(false);
  /* Ručno preuzimamo skrol umesto da pustimo browser da ga pokrene
     dok je stranica jos "zakljucana" (overflow:hidden od otvorenog
     menija) — to je izazivalo neuskladjen, zakasneli skok na mobilnom. */
  if (href && href.charAt(0) === '#' && href.length > 1) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const doScroll = () => target.scrollIntoView({behavior:'smooth', block:'start'});
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
      /* Korektivni drugi pokušaj: ako stranica jos nije bila spremna
         (npr. spoljni fontovi/skripte) i prvi skrol je zbog toga
         promašio, ovo tiho ispravi poziciju bez vidljivog skoka
         ako je vec tacna. */
      setTimeout(doScroll, 700);
    }
  }
}));
