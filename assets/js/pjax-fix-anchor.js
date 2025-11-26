document.addEventListener('click', function(e) {
  const a = e.target.closest('a');
  if (!a) return;

  if (a.hash && a.pathname === window.location.pathname) {
    // 本页锚点，不触发 PJAX
    e.preventDefault();
    const el = document.getElementById(a.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
});
