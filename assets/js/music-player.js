(() => {
  if (window._musicPlayerInitialized) return;
  window._musicPlayerInitialized = true;

  window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('music-player');
    const btnFixed = document.getElementById('toggle-player-fixed');
    if (!container || !btnFixed) return;

    let hidden = false;

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
    } catch (e) {}

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

    console.log('[Music] 播放器初始化完成');
  });
})();
