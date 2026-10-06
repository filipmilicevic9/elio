(() => {
 const root = document.getElementById('photoProcess'); if (!root) return;
 const frames = [...root.querySelectorAll('.process-frame')];
 const steps = [...root.querySelectorAll('.process-step')];
 const play = root.querySelector('#processPlay');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 let index = 0, running = !reduced.matches, visible = false, timer = null, ready = false;
 const clear = () => { clearTimeout(timer); timer = null; };
 const schedule = () => { clear(); if (running && visible && ready && !document.hidden) timer = setTimeout(() => { show((index + 1) % frames.length); }, index === 5 ? 4000 : 2800); };
 const show = next => {
   index = next;
   frames.forEach((frame, i) => { frame.classList.toggle('active', i === index); frame.setAttribute('aria-hidden', String(i !== index)); });
   steps.forEach((step, i) => { step.classList.toggle('active', i === index); step.setAttribute('aria-pressed', String(i === index)); });
   root.querySelector('#processCounter').textContent = String(index + 1).padStart(2, '0') + ' / 06';
   root.querySelector('#processCaption').textContent = steps[index].querySelector('strong').textContent;
   schedule();
 };
 const state = () => { play.textContent = running ? 'Pauziraj' : 'Pokreni'; play.setAttribute('aria-label', running ? 'Pauziraj animaciju' : 'Pokreni animaciju'); schedule(); };
 steps.forEach((step, i) => step.addEventListener('click', () => { running = false; show(i); state(); }));
 play.addEventListener('click', () => { running = !running; state(); });
 document.addEventListener('visibilitychange', schedule);
 reduced.addEventListener('change', () => { if (reduced.matches) { running = false; state(); } });
 new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold: .15}).observe(root);
 Promise.all(frames.map(frame => frame.decode().catch(() => {}))).then(() => { ready = true; schedule(); });
 show(0); state();
})();
