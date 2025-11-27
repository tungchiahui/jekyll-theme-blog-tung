function fixChineseTocLinks() {
  document.querySelectorAll('.toc a').forEach(a => {
    const hash = a.getAttribute('href').slice(1);
    a.href = '#' + encodeURIComponent(hash);
  });
}

function scrollToHash() {
  if (window.location.hash) {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }
}

// 页面初次加载
document.addEventListener('DOMContentLoaded', () => {
  fixChineseTocLinks();
  scrollToHash();
});

// PJAX 切换完成后
document.addEventListener('pjax:complete', () => {
  fixChineseTocLinks();
  scrollToHash();
});
