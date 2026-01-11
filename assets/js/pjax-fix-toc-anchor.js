// pjax-fix-toc-anchor.js
document.addEventListener("pjax:complete", () => {
  if (location.hash) {
    const id = decodeURIComponent(location.hash.substring(1));
    const target = document.getElementById(id);
    if (target) {
      // 延迟执行，确保 DOM 渲染完成
      setTimeout(() => {
        target.scrollIntoView({ behavior: "instant" });
      }, 50);
    }
  }
});

// 覆盖所有内部锚点点击
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    const id = decodeURIComponent(link.hash.substring(1));
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();

      // 滚动到目标
      target.scrollIntoView({ behavior: "instant" });

      // 更新 URL hash，不触发滚动
      history.pushState(null, "", link.hash);
    }
  });
});
