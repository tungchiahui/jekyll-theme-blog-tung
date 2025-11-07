// 页面内容加载完成后执行
document.addEventListener("DOMContentLoaded", function() {

  const imgs = document.querySelectorAll('.post-content img');

  imgs.forEach(img => {
    // 如果图片还没有 data-src，就把 src 移过去
    if (!img.dataset.src) {
      img.dataset.src = img.src; 
      img.removeAttribute('src'); 
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');

          // ✅ 新增：当图片真正加载完成后，触发自定义事件
          img.addEventListener('load', () => {
            const event = new CustomEvent('lazyloaded', { detail: { img } });
            document.dispatchEvent(event);
          }, { once: true });
        }

        obs.unobserve(img);
      }
    });
  }, {
    root: null,           
    rootMargin: '666px 0px',
    threshold: 0          
  });

  imgs.forEach(img => observer.observe(img));
});