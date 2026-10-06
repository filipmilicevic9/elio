(() => {
  const viewer = document.querySelector('.device-viewer');
  if (!viewer) return;
  const toggle = viewer.querySelector('.device-toggle');
  const action = viewer.querySelector('.device-action');
  const openImage = viewer.querySelector('.device-open');
  const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
  let pinned = false;
  const update = () => {
    const visible = pinned || viewer.classList.contains('is-hovered');
    viewer.classList.toggle('is-open', pinned);
    [toggle, action].forEach(button => button.setAttribute('aria-pressed', String(visible)));
    toggle.setAttribute('aria-label', visible ? 'Zatvori prikaz unutrašnjosti uređaja' : 'Prikaži unutrašnjost uređaja');
    openImage.setAttribute('aria-hidden', String(!visible));
    action.innerHTML = visible ? 'Zatvori uređaj <span aria-hidden="true">↙</span>' : 'Otvori uređaj <span aria-hidden="true">↗</span>';
  };
  [toggle, action].forEach(button => button.addEventListener('click', () => {
    pinned = !pinned;
    viewer.classList.remove('is-hovered');
    update();
  }));
  toggle.addEventListener('pointerenter', event => {
    if (hover.matches && event.pointerType === 'mouse') {
      viewer.classList.add('is-hovered'); update();
    }
  });
  toggle.addEventListener('pointerleave', () => {
    viewer.classList.remove('is-hovered'); if (hover.matches) pinned = false; update();
  });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      pinned = false; viewer.classList.remove('is-hovered'); update();
    }
  });
  update();
})();
