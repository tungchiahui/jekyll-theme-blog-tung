// function generateTocPinyin() {
//   // 获取文章里的标题
//   const headers = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
  
//   headers.forEach(h => {
//     const text = h.innerText.trim();
//     if (!text) return;

//     // 转成拼音 ID
//     const id = window.PinyinPro.pinyin(text, { toneType: 'none', type: 'array' }).join('-').toLowerCase();
//     h.id = id;

//     // 更新 TOC 中的对应链接
//     const tocLink = document.querySelector(`.toc a[href="#${text}"], .toc a[href*="${text}"]`);
//     if (tocLink) tocLink.href = `#${id}`;
//   });
// }

// // 页面初次加载
// document.addEventListener('DOMContentLoaded', generateTocPinyin);

// // PJAX 完成后重新生成 TOC
// document.addEventListener('pjax:complete', generateTocPinyin);

// // 如果你用的是 PJAX + 初始 load 也走 pjax:complete，可以去掉 DOMContentLoaded