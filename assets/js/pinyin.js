<script src="https://cdn.jsdelivr.net/npm/pinyin-pro@3.27.0/dist/index.umd.js"></script>
<script>
document.addEventListener("DOMContentLoaded", convertTocToPinyin);
document.addEventListener("pjax:complete", convertTocToPinyin);     // jquery.pjax
document.addEventListener("turbolinks:render", convertTocToPinyin); // Turbolinks
document.addEventListener("swup:contentReplaced", convertTocToPinyin); // swup

// 如果你用的是其他 PJAX 库，再加对应的回调事件即可（99% 的库都会触发 DOMContentLoaded）

function convertTocToPinyin() {
  const { pinyin } = window.PinyinPro;

  // 1. 修改所有标题的 id 为拼音
  document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach(h => {
    const text = h.textContent.trim();
    if (!text) return;
    const py = pinyin(text, { toneType: "none", nonChinese: "" })
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
      .toLowerCase();
    if (py) h.id = py;
  });

  // 2. 修改 kramdown 生成的 {:toc} 里面的所有链接（支持几乎所有主题的 class/id）
  document.querySelectorAll("#markdown-toc a, .toc a, .post-toc a, [class*='toc'] a").forEach(a => {
    if (!a.hash) return;
    const text = a.textContent.trim();
    if (!text) return;
    const py = pinyin(text, { toneType: "none", nonChinese: "" })
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
      .toLowerCase();
    if (py) a.hash = "#" + py;
  });
}
</script>