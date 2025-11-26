<!-- 正确的 pinyin-pro CDN -->
<script src="https://cdn.jsdelivr.net/npm/pinyin-pro@3.27.0/dist/index.min.js"></script>

<script>
function convertChineseToPinyin() {
  // 等 kramdown 把 {:toc} 真正插进 DOM 之后再执行
  const observer = new MutationObserver((mutations, obs) => {
    if (!document.querySelector('#markdown-toc')) return;

    obs.disconnect();  // 找到就停止观察

    const { pinyin } = window.PinyinPro;
    const toPy = text => pinyin(text.trim(), { toneType: 'none' })
      .replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/[^\w-]/g, '') || 'section';

    // 改所有标题的 id
    document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(h => {
      h.id = toPy(h.textContent);
    });

    // 改目录里的链接（kramdown 原生生成的一定是 #markdown-toc）
    document.querySelectorAll('#markdown-toc a').forEach(a => {
      a.hash = '#' + toPy(a.textContent);
      a.href = a.href.split('#')[0] + a.hash;  // 防止某些主题写死了完整路径
    });

    console.log('TOC 拼音锚点转换完成！');
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// 普通页面加载
convertChineseToPinyin();

// PJAX 切换后重新执行（你用的是 jquery.pjax 对吧？）
document.addEventListener('pjax:complete', convertChineseToPinyin);
</script>