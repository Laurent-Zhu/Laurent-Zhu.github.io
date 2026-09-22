(() => {
  'use strict';

  const copy = {
    en: {
      skip: 'Skip to content',
      aboutIntro: "I'm Yifan Zhu, a Software Engineering undergraduate at Northwestern Polytechnical University.",
      openVideo: 'Open video',
      original: 'Original homepage', menuOpen: 'Open navigation', menuClose: 'Close navigation',
      backTop: 'Back to top', profileAlt: 'Yifan Zhu',
      videoUAV: 'UAV traffic perception demo', videoAgri: 'AgriGuard pest management demo'
    },
    zh: {
      skip: '跳转到正文',
      aboutIntro: '我是朱羿帆，西北工业大学软件工程专业本科生。',
      openVideo: '打开视频',
      original: '原版主页', menuOpen: '打开导航', menuClose: '关闭导航',
      backTop: '回到顶部', profileAlt: '朱羿帆',
      videoUAV: '无人机交通感知系统演示', videoAgri: 'AgriGuard 病虫害管理平台演示'
    }
  };
  let language = 'en';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');

  function updateMenuLabel(open) {
    const label = copy[language][open ? 'menuClose' : 'menuOpen'];
    menuButton.setAttribute('aria-label', label);
    menuButton.title = label;
    menuButton.querySelector('img').src = `assets/icons/moonshot/${open ? 'x' : 'menu'}.svg`;
  }

  function setMenu(open, returnFocus = false) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    updateMenuLabel(open);
    if (returnFocus) menuButton.focus();
  }

  function applyLanguage(next, persist = true) {
    language = next === 'zh' ? 'zh' : 'en';
    const content = window.HOMEPAGE_CONTENT?.[language];
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = content?.[element.dataset.i18n];
      if (value !== undefined) element.innerHTML = value;
    });
    document.querySelectorAll('[data-copy]').forEach(element => {
      const value = copy[language][element.dataset.copy];
      if (value !== undefined) element.innerHTML = value;
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    updateMenuLabel(!menu.hidden);
    document.querySelector('.header-cv').href = language === 'zh'
      ? 'assets/cv/yifan_zhu_resume.pdf' : 'assets/cv/yifan_zhu_resume_en.pdf';
    document.querySelector('.profile-photo').alt = copy[language].profileAlt;
    document.querySelectorAll('video').forEach((video, index) => {
      video.setAttribute('aria-label', copy[language][index === 0 ? 'videoUAV' : 'videoAgri']);
    });
    const topLink = document.querySelector('.site-footer .icon-button');
    topLink.setAttribute('aria-label', copy[language].backTop);
    topLink.title = copy[language].backTop;
    if (persist) {
      try { localStorage.setItem('moonshot-language', language); } catch { /* Storage can be disabled. */ }
    }
  }

  let savedLanguage;
  try { savedLanguage = localStorage.getItem('moonshot-language'); } catch { /* Use browser language. */ }
  applyLanguage(savedLanguage || (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'), false);
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });

  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const target = document.querySelector(link.hash);
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);
    if (event.key !== 'Tab' || menu.hidden) return;
    const focusables = [...document.querySelectorAll('.header-inner a, .header-inner button, .mobile-nav a')]
      .filter(element => element.getClientRects().length);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  const desktop = window.matchMedia('(min-width: 1024px)');
  desktop.addEventListener('change', event => { if (event.matches) setMenu(false); });

  if ('IntersectionObserver' in window) {
    const navigation = [...document.querySelectorAll('.desktop-nav a')];
    const activeSections = new Set();
    const navigationObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activeSections.add(entry.target.id);
        else activeSections.delete(entry.target.id);
      });
      const current = navigation.find(link => activeSections.has(link.hash.slice(1)));
      navigation.forEach(link => {
        if (link === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    navigation.forEach(link => navigationObserver.observe(document.querySelector(link.hash)));
  }

  // Keep only one project soundtrack playing at a time.
  const videos = [...document.querySelectorAll('video')];
  videos.forEach(video => video.addEventListener('play', () => {
    videos.forEach(other => { if (other !== video) other.pause(); });
  }));
})();
