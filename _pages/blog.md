---
layout: default
title: 博客
permalink: /blog/
---

<link rel="stylesheet" href="{{ '/assets/css/blog.css' | relative_url }}">

<section class="blog-container">
  <h1 class="blog-title">📝 博客文章</h1>

  <p class="blog-notice">
    ⚠️ 本页博客已停止更新，已迁移至新的 VitePress 博客界面。请访问 
    <a href="https://blog.vp.tungchiahui.cn/" target="_blank" rel="noopener">https://blog.vp.tungchiahui.cn/</a> 阅读最新文章。
  </p>

  <!-- 搜索框 -->
  <div class="search-box">
    <input type="text" id="searchInput" placeholder="搜索文章标题或简介..." />
  </div>

  <div class="blog-grid" id="blogList">
    {% for post in site.posts %}
      <article class="blog-card" data-title="{{ post.title | downcase }}" data-excerpt="{{ post.excerpt | strip_html | downcase }}">
        <h2 class="blog-post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>
        <p class="blog-meta">
          {{ post.date | date: "%Y-%m-%d" }} · 作者：{{ site.author }}
        </p>

        {% if post.excerpt %}
          <p class="blog-excerpt">{{ post.excerpt | strip_html | truncate: 80 }}</p>
        {% endif %}

        <a class="read-more" href="{{ post.url | relative_url }}">阅读全文 →</a>
      </article>
    {% endfor %}
  </div>
</section>

<script>
  // 简单前端搜索功能
  const searchInput = document.getElementById('searchInput');
  const blogList = document.getElementById('blogList');
  const cards = blogList.getElementsByClassName('blog-card');

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    Array.from(cards).forEach(card => {
      const title = card.getAttribute('data-title');
      const excerpt = card.getAttribute('data-excerpt');
      if (title.includes(query) || excerpt.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
</script>

<style>
  .blog-notice {
  margin-top: 8px;       /* 标题下方一点点间距 */
  font-size: 0.95rem;    /* 稍微比正文小一点 */
  color: #555;           /* 深灰色，不抢眼 */
}

.blog-notice a {
  color: #007acc;        /* 链接颜色 */
  text-decoration: underline;
}
  </style>
