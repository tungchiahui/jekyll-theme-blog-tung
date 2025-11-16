---
layout: default
title: 首页
---

<div class="home-header">

  <h1>🌟 欢迎来到 <b>Tung Chia-hui 的个人网站</b> 👋</h1>
  <p class="subtitle">探索、学习与创造的记录</p>

  <div class="btn-group">
    <a href="{{ '/blog/' | relative_url }}" class="btn-primary">
      🚀 进入博客文章
    </a>
  </div>

</div>

---

## 🧠 关于本站

<p class="intro">
这里是我记录学习与创作的地方，主要内容包括：
</p>

<div class="cards">

  <div class="card">
    <h3>💻 编程与嵌入式开发</h3>
    <p>专注于 C/C++、Python 编程，以及基于 Linux 系统环境的开发。涉及嵌入式系统（STM32、ESP32）、FreeRTOS 与底层驱动实现。</p>
  </div>

  <div class="card">
    <h3>🤖 机器人与自动化</h3>
    <p>学习与实践 ROS1 / ROS2 平台下的运动控制、导航建图与传感器融合，同时探索 OpenCV4 在计算机视觉与环境感知中的应用。</p>
  </div>

  <div class="card">
    <h3>🖥️ 图形界面与工具开发</h3>
    <p>使用 Qt6 构建上位机与可视化调试工具。</p>
  </div>

  <div class="card">
    <h3>🌐 Web 与博客技术</h3>
    <p>本站基于 Jekyll 搭建，偶尔分享 HTML / CSS / 前端优化的经验。</p>
  </div>

  <div class="card">
    <h3>📱 移动应用与工具开发</h3>
    <p>在 Android 平台上开发机器人上位机与辅助工具，实现控制、监控与数据可视化，提升机器人项目的效率与体验。</p>
  </div>

  <div class="card">
    <h3>✏️ 随笔与思考</h3>
    <p>记录我在学习、开发与生活中的一些想法与感悟。</p>
  </div>

</div>

---

## 🎬 ROBOCON

<!-- 封面 + 播放按钮 + 真正的视频 -->
<div class="video-container" style="position: relative; max-width: 100%;">

  <!-- 封面图 -->
  <img id="videoCover"
       src="https:https://cdn.tungchiahui.cn/tungwebsite/assets/videos/header-bg-cover.webp"
       alt="video cover"
       style="width:100%; display:block; cursor:pointer; border-radius:10px;">

  <!-- 播放按钮 -->
  <div id="videoPlayButton"
       style="
         position:absolute;
         top:50%;
         left:50%;
         transform:translate(-50%, -50%);
         width:80px;
         height:80px;
         background:rgba(0,0,0,0.6);
         border-radius:50%;
         display:flex;
         justify-content:center;
         align-items:center;
         cursor:pointer;
       ">
    <div style="
      width:0;
      height:0;
      border-left:28px solid white;
      border-top:18px solid transparent;
      border-bottom:18px solid transparent;
      margin-left:6px;
    "></div>
  </div>

  <!-- 视频 -->
  <video id="myVideo" controls preload="none" style="display:none; width:100%; border-radius:10px;">
    <source id="videoSource" type="video/mp4">
    您的浏览器不支持视频播放。
  </video>

</div>

<script>
document.getElementById("videoCover").onclick = loadVideo;
document.getElementById("videoPlayButton").onclick = loadVideo;

function loadVideo() {
  const video = document.getElementById("myVideo");
  const source = document.getElementById("videoSource");

  // 隐藏封面图和播放按钮
  document.getElementById("videoCover").style.display = "none";
  document.getElementById("videoPlayButton").style.display = "none";

  // 显示 video
  video.style.display = "block";

  // 加载真正的视频
  source.src = "https://cdn.tungchiahui.cn/tungwebsite/assets/videos/header-bg.mp4";
  video.load();
  video.play();
}
</script>

---

## 📰 最新博客

{% include_relative _pages/blog.md %}
