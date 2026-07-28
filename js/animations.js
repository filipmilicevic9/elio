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

  /* ---------- ANIMACIJA PROCESA ----------
     1 prilazak → 2 spuštanje stopala → 3 grejanje →
     4 skupljanje folije oko đona → 5 podizanje → 6 zaštićen đon */

  const FOOT_UP = -190;   /* početna visina stopala iznad platforme */
  const FOOT_SIDE = 140;  /* početni bočni pomak (prilazak) */

  const tl = gsap.timeline({repeat:-1, repeatDelay:1.4, defaults:{ease:'power2.inOut'}});

  tl.set('#foot', {y:FOOT_UP, x:FOOT_SIDE, opacity:0})
    .set('#filmFit', {opacity:0})
    .set('#filmLoose', {opacity:0})
    .set('#heatGlow', {opacity:0})
    .set('#heatWaves', {opacity:0})
    .set('#doneBadge', {opacity:0, y:8})
    .set('#lcdProgress', {scaleX:0, transformOrigin:'left center'})

    /* 1 — prilazak */
    .call(() => { setStep(0); setLcd('SPREMAN'); })
    .to('#foot', {opacity:1, x:0, duration:1.0})

    /* 2 — spuštanje stopala */
    .call(() => setStep(1))
    .to('#foot', {y:0, duration:.9, ease:'power3.in'})
    .to('#footMark', {opacity:0, duration:.2}, '<70%')

    /* 3 — senzor + grejanje */
    .call(() => { setStep(2); setLcd('GREJANJE'); })
    .fromTo('#sensorDot', {fill:'#22C55E'}, {fill:'#F59E0B', duration:.25})
    .to('#filmLoose', {opacity:1, duration:.3}, '<')
    .to('#heatGlow', {opacity:1, duration:.4}, '<')
    .fromTo('#heatWaves', {opacity:0, y:8}, {opacity:1, y:-6, duration:.5}, '<')
    .to('#heatWaves', {y:-14, opacity:.4, duration:.7, yoyo:true, repeat:1}, '<50%')
    .to('#lcdProgress', {scaleX:.45, duration:1.2, ease:'none'}, '<')

    /* 4 — folija se skuplja SAMO oko đona */
    .call(() => setStep(3))
    .to('#filmLoose', {
      attr:{d:'M180 292 C180 283 192 278 208 278 L330 278 C351 278 363 286 363 295 C363 304 351 309 330 309 L208 309 C192 309 180 301 180 292 Z'},
      duration:1.1, ease:'power3.inOut'
    })
    .to('#lcdProgress', {scaleX:1, duration:1.1, ease:'none'}, '<')
    .to('#filmLoose', {opacity:0, duration:.2})
    .to('#filmFit', {opacity:1, duration:.3}, '<')
    .to('#heatGlow', {opacity:0, duration:.4}, '<')
    .to('#heatWaves', {opacity:0, duration:.3}, '<')

    /* 5 — podizanje noge (folija ostaje na đonu) */
    .call(() => { setStep(4); setLcd('ZAVRŠENO'); })
    .fromTo('#sensorDot', {fill:'#F59E0B'}, {fill:'#22C55E', duration:.3})
    .to('#foot', {y:FOOT_UP * .55, duration:.9, ease:'power3.out'})
    .to('#footMark', {opacity:.9, duration:.3}, '<40%')

    /* 6 — potvrda */
    .call(() => { setStep(5); setLcd('SPREMAN'); })
    .to('#doneBadge', {opacity:1, y:0, duration:.5, ease:'back.out(1.6)'})
    .to({}, {duration:1.6})
    .to(['#foot','#doneBadge'], {opacity:0, duration:.5})
    .set('#lcdProgress', {scaleX:0});

  /* Pauziraj animaciju dok nije u vidnom polju */
  ScrollTrigger.create({
    trigger:'.process-stage',
    start:'top 90%', end:'bottom 10%',
    onEnter:() => tl.play(), onLeave:() => tl.pause(),
    onEnterBack:() => tl.play(), onLeaveBack:() => tl.pause()
  });

} else {
  /* Bez animacija: prikaži sve i označi poslednji korak */
  document.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  document.getElementById('filmFit').style.opacity = 1;
  document.querySelectorAll('#processSteps .p-step').forEach(s => s.classList.add('active'));
}
