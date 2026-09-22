(() => {
  'use strict';

  const copy = {
    en: {
      skip: 'Skip to content', heroIntro: 'Exploring language, vision<br>and intelligent 3D-CAD systems.',
      explore: 'Explore my research', aboutTitle: 'Curiosity,<br>put into practice.',
      aboutIntro: "I'm Yifan Zhu, a Software Engineering undergraduate at Northwestern Polytechnical University.",
      earlier: 'Earlier updates', publication: 'Publication details',
      brepSubtitle: 'Enabling Large Language Models to Understand Boundary Representations',
      cadSubtitle: 'One representation for generation, understanding and editing.',
      openVideo: 'Open video', contactTitle: "Let's connect<span class=\"pixel-period\">.</span>",
      contactIntro: 'Research, ideas and things worth building.', contactLabel: 'Contact',
      resumeLabel: 'Curriculum vitae', chineseCV: 'Chinese CV', englishCV: 'English CV',
      original: 'Original homepage', menuOpen: 'Open navigation', menuClose: 'Close navigation',
      backTop: 'Back to top', heroAlt: 'Yifan Zhu beside a lake in Tibet',
      videoUAV: 'UAV traffic perception demo', videoAgri: 'AgriGuard pest management demo'
    },
    zh: {
      skip: '跳转到正文', heroIntro: '探索语言、视觉<br>与智能 3D-CAD 系统。',
      explore: '了解我的研究', aboutTitle: '让好奇心，<br>成为实践。',
      aboutIntro: '我是朱羿帆，西北工业大学软件工程专业本科生。',
      earlier: '更早动态', publication: '论文信息',
      brepSubtitle: '让大语言模型理解 CAD 边界表示',
      cadSubtitle: '以统一表示连接生成、理解与编辑。',
      openVideo: '打开视频', contactTitle: '保持联系<span class="pixel-period">.</span>',
      contactIntro: '交流研究、想法与值得实现的项目。', contactLabel: '联系方式',
      resumeLabel: '个人简历', chineseCV: '中文简历', englishCV: '英文简历',
      original: '原版主页', menuOpen: '打开导航', menuClose: '关闭导航',
      backTop: '回到顶部', heroAlt: '朱羿帆在西藏湖边的照片',
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
    document.querySelector('.hero-photo').alt = copy[language].heroAlt;
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

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.06 });
    if (!reducedMotion.matches) {
      document.querySelectorAll('.reveal').forEach(element => {
        if (element.getBoundingClientRect().top <= window.innerHeight) return;
        element.classList.add('is-pending');
        revealObserver.observe(element);
      });
    }
    reducedMotion.addEventListener('change', event => {
      if (!event.matches) return;
      revealObserver.disconnect();
      document.querySelectorAll('.is-pending').forEach(element => element.classList.remove('is-pending'));
    });

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
