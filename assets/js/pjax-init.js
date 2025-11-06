// assets/js/pjax-init.js

document.addEventListener("DOMContentLoaded", function() {
  // 初始化 PJAX
  const pjax = new Pjax({
    elements: "a:not([target='_blank']):not([no-pjax])",
    selectors: ["title", "#pjax-container"],
    cacheBust: false, // 避免每次刷新加时间戳
  });

  // --- 页面切换前 ---
  document.addEventListener("pjax:send", () => {
    // 你可以加上 loading 动画之类
    document.body.classList.add("pjax-loading");
  });

  // --- 页面切换后 ---
  document.addEventListener("pjax:complete", () => {
    document.body.classList.remove("pjax-loading");

    // 如果你有需要重新执行的代码（如代码高亮、评论系统等），放这里。
    // ⚠️ 音乐播放器在 #pjax-container 之外，不会被影响。

    // 举例：如果有页面滚动到顶部需求
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 如果你的页面内有 <script data-pjax-reload> 标签，可以手动执行它们
    document.querySelectorAll("script[data-pjax-reload]").forEach((oldScript) => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
      oldScript.remove();
    });
  });
});
