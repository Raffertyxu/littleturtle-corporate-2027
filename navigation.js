(function () {
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.sidebar-close');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const sidebar = document.querySelector('.page-sidebar');
  if (!toggle || !close || !backdrop || !sidebar) return;
  function setOpen(open, restoreFocus) {
    document.body.classList.toggle('sidebar-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('sidebar-open'), false));
  close.addEventListener('click', () => setOpen(false, true));
  backdrop.addEventListener('click', () => setOpen(false, true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('sidebar-open')) setOpen(false, true);
  });
  sidebar.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target && target.tagName === 'DETAILS') target.open = true;
    setOpen(false, false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000 && document.body.classList.contains('sidebar-open')) setOpen(false, false);
  });
})();
