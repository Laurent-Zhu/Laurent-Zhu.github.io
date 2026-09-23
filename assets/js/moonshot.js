(() => {
  'use strict';

  const copy = {
    en: {
      skip: 'Skip to content',
      openVideo: 'Open video',
      home: 'Yifan Zhu, home', menuOpen: 'Open navigation', menuClose: 'Close navigation',
      backTop: 'Back to top', profileAlt: 'Yifan Zhu',
      videoUAV: 'UAV traffic perception demo', videoAgri: 'AgriGuard pest management demo',
      profileLinks: 'Profile links', resumeZh: 'Chinese CV', resumeEn: 'English CV',
      poster: 'View full BrepLLM poster', posterAlt: 'BrepLLM ECCV 2026 research poster',
      portfolioNavigation: 'Portfolio navigation', portfolioTrack: 'Projects',
      portfolioTopics: 'Topics', previousProject: 'Previous project', nextProject: 'Next project',
      cadqueryImage: 'Mechanical CAD model changing from wireframe to verified solid',
      uavImage: 'UAV viewing urban traffic through visible and infrared cameras',
      agriImage: 'Rice leaf roller moth detection and pest management workflow'
    },
    zh: {
      skip: '跳转到正文',
      openVideo: '打开视频',
      home: '朱羿帆，回到顶部', menuOpen: '打开导航', menuClose: '关闭导航',
      backTop: '回到顶部', profileAlt: '朱羿帆',
      videoUAV: '无人机交通感知系统演示', videoAgri: 'AgriGuard 病虫害管理平台演示',
      profileLinks: '个人主页链接', resumeZh: '中文简历', resumeEn: '英文简历',
      poster: '查看 BrepLLM 完整海报', posterAlt: 'BrepLLM ECCV 2026 研究海报',
      portfolioNavigation: '作品集切换', portfolioTrack: '项目作品',
      portfolioTopics: '项目关键词', previousProject: '上一个项目', nextProject: '下一个项目',
      cadqueryImage: '从线框过渡到验证后实体模型的机械 CAD 零件',
      uavImage: '无人机通过可见光与红外影像观察城市交通',
      agriImage: '稻纵卷叶螟识别与病虫害管理流程'
    }
  };
  let language = 'en';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');
  const globeScript = document.querySelector('.visitor-globe__embed script');
  if (globeScript && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    globeScript.dataset.rotationSpeed = 'off';
  }

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
    document.querySelectorAll('[data-aria-copy]').forEach(element => {
      const value = copy[language][element.dataset.ariaCopy];
      if (value !== undefined) {
        element.setAttribute('aria-label', value);
        if (element.hasAttribute('title')) element.title = value;
      }
    });
    document.querySelectorAll('[data-alt-copy]').forEach(element => {
      const value = copy[language][element.dataset.altCopy];
      if (value !== undefined) element.alt = value;
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    updateMenuLabel(!menu.hidden);
    document.querySelector('.header-cv').href = language === 'zh'
      ? 'assets/cv/yifan_zhu_resume.pdf' : 'assets/cv/yifan_zhu_resume_en.pdf';
    document.querySelector('.profile-photo').alt = copy[language].profileAlt;
    document.querySelector('.wordmark').setAttribute('aria-label', copy[language].home);
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
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.language);
      updateCurrentSection();
    });
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
  const desktop = window.matchMedia('(min-width: 1151px)');
  desktop.addEventListener('change', event => { if (event.matches) setMenu(false); });

  const nav = document.querySelector('.desktop-nav');
  const navigation = [...nav.querySelectorAll('a')];
  const indicator = nav.querySelector('.nav-indicator');
  const sections = navigation.map(link => document.querySelector(link.hash));
  const header = document.querySelector('.site-header');
  function updateCurrentSection() {
    const readingLine = header.getBoundingClientRect().bottom + 40;
    let currentIndex = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) currentIndex = index;
    });
    const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (pageHeight > window.innerHeight && window.scrollY + window.innerHeight >= pageHeight - 2) {
      currentIndex = navigation.length - 1;
    }
    navigation.forEach((link, index) => {
      if (index === currentIndex) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const linkRect = navigation[currentIndex].getBoundingClientRect();
    if (linkRect.width > 0) {
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.transform = `translateX(${linkRect.left - nav.getBoundingClientRect().left}px)`;
      if (!indicator.classList.contains('is-ready')) {
        indicator.getBoundingClientRect();
        indicator.classList.add('is-ready');
      }
    }
  }
  window.addEventListener('scroll', updateCurrentSection, { passive: true });
  window.addEventListener('resize', updateCurrentSection);
  window.addEventListener('hashchange', updateCurrentSection);
  window.addEventListener('load', updateCurrentSection);
  updateCurrentSection();

  const portfolioTrack = document.querySelector('[data-portfolio-track]');
  const portfolioCards = [...portfolioTrack.querySelectorAll('.portfolio-card')];
  const portfolioIndex = document.querySelector('[data-portfolio-index]');
  const portfolioProgress = document.querySelector('[data-portfolio-progress]');
  const previousProject = document.querySelector('[data-portfolio-prev]');
  const nextProject = document.querySelector('[data-portfolio-next]');
  let currentProject = 0;
  function updatePortfolio() {
    const trackCenter = portfolioTrack.getBoundingClientRect().left + portfolioTrack.clientWidth / 2;
    let nearestDistance = Infinity;
    portfolioCards.forEach((card, index) => {
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        currentProject = index;
      }
    });
    portfolioIndex.textContent = String(currentProject + 1).padStart(2, '0');
    portfolioProgress.style.width = `${(currentProject + 1) / portfolioCards.length * 100}%`;
    previousProject.disabled = currentProject === 0;
    nextProject.disabled = currentProject === portfolioCards.length - 1;
  }
  function scrollToProject(index) {
    const target = portfolioCards[Math.max(0, Math.min(index, portfolioCards.length - 1))];
    portfolioTrack.scrollTo({
      left: target.offsetLeft - portfolioCards[0].offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }
  previousProject.addEventListener('click', () => scrollToProject(currentProject - 1));
  nextProject.addEventListener('click', () => scrollToProject(currentProject + 1));
  portfolioTrack.addEventListener('scroll', updatePortfolio, { passive: true });
  window.addEventListener('resize', updatePortfolio);
  window.addEventListener('load', updatePortfolio);
  updatePortfolio();

  // Keep only one project soundtrack playing at a time.
  const videos = [...document.querySelectorAll('video')];
  videos.forEach(video => video.addEventListener('play', () => {
    videos.forEach(other => { if (other !== video) other.pause(); });
  }));
  document.querySelectorAll('.project-details').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) details.querySelector('video')?.pause();
    });
  });
})();
