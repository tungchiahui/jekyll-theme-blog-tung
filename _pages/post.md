---
layout: default
title: 博客
permalink: /blog/
---

# 博客文章

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <small>
        ({{ post.date | date: "%Y-%m-%d" }} | 作者: {{ site.author }})
      </small>
    </li>
  {% endfor %}
</ul>
