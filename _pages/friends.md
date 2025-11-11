---
layout: default
title: 友情链接
permalink: /friends/
---

<link rel="stylesheet" href="{{ '/assets/css/friends.css' | relative_url }}">

<div class="friends-wrap">
  <div class="friends-header">
    <h1>🤝 友情链接</h1>
    <p>汇聚技术资源、开源社区、竞赛团队及优质网站，方便学习、交流与探索更多创新内容。</p>
  </div>

  <div class="friends-divider"></div>

  <!-- 调该数组就可以调分类顺序 -->
  {% assign categories_order = "高校团队,赛事,社区,博主" | split: "," %}

  {% for category in categories_order %}
    <div class="friend-category-title">{{ category }}</div>
    <div class="friends-grid">
      {% assign friends_in_category = site.data.friends | where: "category", category %}
      {% for friend in friends_in_category %}
        <a class="friend" href="{{ friend.url }}" target="_blank" rel="noopener noreferrer">
          <div class="friend-top">
            <img
              class="friend-icon-img"
              src="{{ friend.icon | default: 'https://cdn.tungchiahui.cn/tungwebsite/assets/images/default-avatar.webp' }}"
              alt="{{ friend.name }}"
              loading="lazy"
              onerror="this.src='https://cdn.tungchiahui.cn/tungwebsite/assets/images/default-avatar.webp';"
            >
            <div>
              <div class="friend-title">{{ friend.name }}</div>
              <div class="friend-sub">{{ friend.desc }}</div>
            </div>
          </div>

          <div class="friend-meta">
            <div class="friend-tags">
              {% for tag in friend.tags %}
                <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
          </div>

          <div class="friend-bottom">
            <span class="friend-visit">访问网站</span>
          </div>
        </a>
      {% endfor %}
    </div>
  {% endfor %}
</div>
