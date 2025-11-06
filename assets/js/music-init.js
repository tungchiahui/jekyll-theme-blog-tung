// assets/js/music-init.js

(() => {
  // 防止 PJAX 页面切换时重复初始化
  if (window.musicPlayerInitialized) return;
  window.musicPlayerInitialized = true;

  const container = document.getElementById('music-player');
  const btnFixed = document.getElementById('toggle-player-fixed');
  if (!container || !btnFixed) return; // 保险：防止模板没加载好时报错

  let hidden = false;

  // 读取上次隐藏状态
  try {
    const saved = localStorage.getItem('music_player_hidden');
    if (saved === 'true') {
      hidden = true;
      container.classList.add('hidden');
      btnFixed.textContent = '🎧 展开';
      btnFixed.classList.remove('open');
    } else {
      btnFixed.textContent = '🎧 收起';
      btnFixed.classList.add('open');
    }
  } catch (e) {
    console.warn('音乐播放器状态读取失败：', e);
  }

  // 切换隐藏/显示
  btnFixed.addEventListener('click', () => {
    hidden = !hidden;
    if (hidden) {
      container.classList.add('hidden');
      btnFixed.textContent = '🎧 展开';
      btnFixed.classList.remove('open');
    } else {
      container.classList.remove('hidden');
      btnFixed.textContent = '🎧 收起';
      btnFixed.classList.add('open');
    }
    try {
      localStorage.setItem('music_player_hidden', hidden ? 'true' : 'false');
    } catch (e) {}
  });
})();          data-server="netease"
          data-type="playlist"
          data-autoplay="false">
      </div>

      <!-- 🎧 控制按钮 -->
      <button id="toggle-player-fixed" aria-pressed="false">🎧 收起</button>
    `;

    const container = document.getElementById('music-player');
    const btnFixed = document.getElementById('toggle-player-fixed');

    // 读取保存的隐藏状态
    let hidden = false;
    try {
      const saved = localStorage.getItem('music_player_hidden');
      if (saved === 'true') hidden = true;
    } catch (e) {}

    if (hidden) {
      container.classList.add('hidden');
      btnFixed.textContent = '🎧 展开';
      btnFixed.classList.remove('open');
    } else {
      btnFixed.textContent = '🎧 收起';
      btnFixed.classList.add('open');
    }

    // 切换按钮点击事件
    btnFixed.addEventListener('click', () => {
      hidden = !hidden;
      if (hidden) {
        container.classList.add('hidden');
        btnFixed.textContent = '🎧 展开';
        btnFixed.classList.remove('open');
      } else {
        container.classList.remove('hidden');
        btnFixed.textContent = '🎧 收起';
        btnFixed.classList.add('open');
      }
      try {
        localStorage.setItem('music_player_hidden', hidden ? 'true' : 'false');
      } catch (e) {}
    });

    // 初始化播放器（用 Meting 自动）
    function initAPlayer() {
      try {
        if (window.APlayer && window.Meting) {
          console.log('[music] initializing APlayer...');
          // Meting 自动扫描 data-* 属性并生成播放器
          new window.Meting();
        } else {
          console.log('[music] waiting for APlayer/Meting...');
          setTimeout(initAPlayer, 200);
        }
      } catch (e) {
        console.warn('[music] failed to init:', e);
      }
    }

    initAPlayer();

    // 监听 PJAX 页面切换，保持播放器不被破坏
    document.addEventListener('pjax:send', () => {
      console.log('[music] pjax:send — 保留播放器');
    });
  });
})();
