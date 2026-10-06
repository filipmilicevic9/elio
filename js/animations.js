/* =====================================================
   ELIO — animations.js
   Sve GSAP animacije: ulazna hero animacija, lebdenje uređaja,
   parallax, scroll-reveal i glavna animacija procesa (6 koraka).
   Fallback bez animacija za prefers-reduced-motion / bez GSAP-a.
   Zahteva: utils.js (prefersReduced) i helpers.js (setStep, setLcd).
   ===================================================== */

/* ---------- GSAP ---------- */
if (window.gsap && !prefersReduced) {
  gsap.registerPlugin(ScrollTrigger);

  /* Ulazna animacija hero sekcije */
  gsap.timeline({defaults:{ease:'power3.out'}})
    .from('.hero-copy > *', {y:36, opacity:0, duration:.9, stagger:.09})
    .from('.hero-device', {y:50, opacity:0, duration:1.1}, '-=.7')
    .from('.hero-badge', {scale:.7, opacity:0, duration:.5, stagger:.12, ease:'back.out(1.8)'}, '-=.5');

  /* Parallax pozadinskih orbova */
  document.querySelectorAll('[data-parallax]').forEach(el => {
    gsap.to(el, {
      y: () => window.innerHeight * parseFloat(el.dataset.parallax),
      ease:'none',
      scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}
    });
  });

  /* Otkrivanje sadržaja pri skrolu */
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.to(el, {
      opacity:1, y:0, duration:.9, ease:'power3.out',
      scrollTrigger:{trigger:el, start:'top 86%'}
    });
  });


} else {
  /* Bez animacija: prikaži sve i označi poslednji korak */
  document.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });

  document.querySelectorAll('#processSteps .p-step').forEach(s => s.classList.add('active'));
}
