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
      themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme',
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
      themeLight: '切换为浅色主题', themeDark: '切换为深色主题',
      cadqueryImage: '从线框过渡到验证后实体模型的机械 CAD 零件',
      uavImage: '无人机通过可见光与红外影像观察城市交通',
      agriImage: '稻纵卷叶螟识别与病虫害管理流程'
    }
  };
  let language = 'en';
  const menuButton = document.querySelector('.menu-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const menu = document.querySelector('#mobile-nav');
  const globeScript = document.querySelector('.visitor-globe__embed script');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (globeScript && reducedMotion.matches) {
    globeScript.dataset.rotationSpeed = 'off';
  }
  let themeTransition = null;

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

  function updateThemeLabel() {
    const light = document.documentElement.dataset.theme === 'light';
    const label = copy[language][light ? 'themeDark' : 'themeLight'];
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
    themeToggle.querySelector('img').src = `assets/icons/moonshot/${light ? 'moon' : 'sun'}.svg`;
  }

  function setTheme(theme, persist = true) {
    const light = theme === 'light';
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]').content = light ? '#ffffff' : '#101010';
    updateThemeLabel();
    if (persist) {
      try { localStorage.setItem('academic-theme', light ? 'light' : 'dark'); } catch { /* Optional preference. */ }
    }
  }

  function makeThemeRain(theme) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return null;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const element = document.createElement('div');
    element.className = 'theme-rain';
    element.setAttribute('aria-hidden', 'true');
    canvas.width = width;
    canvas.height = 1;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    const light = theme === 'light';
    const tones = light ? ['#171717', '#666666', '#aaaaaa'] : ['#f5f5f5', '#a0a0a0', '#585858'];
    const cell = 12;
    const columns = Array.from({ length: Math.ceil(width / cell) }, (_, index) => ({
      delay: 0.055 + (Math.sin(index * 0.19) + 1) * 0.028 + Math.random() * 0.018,
      duration: 0.69 + Math.random() * 0.025,
      speed: 38 + Math.random() * 65,
      seed: Math.floor(Math.random() * 10000)
    }));
    const hash = value => {
      value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
      return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
    };
    let frame = 0;
    let stopped = false;
    const styles = document.createElement('style');
    styles.textContent = '::view-transition-old(root) { clip-path: inset(0); } ::view-transition-group(theme-rain) {}';
    document.head.appendChild(styles);
    const [revealRule, rainRule] = styles.sheet.cssRules;

    function start(finish) {
      const started = performance.now();
      const interval = 1000 / 30;
      let lastPaint = started - interval;
      function paint(now) {
        if (stopped) return;
        const elapsed = now - started;
        if (elapsed >= 1500) { finish(); return; }
        frame = requestAnimationFrame(paint);
        if (now - lastPaint < interval) return;
        lastPaint = now - (now - lastPaint) % interval;
        const progress = elapsed / 1500;
        const edge = [];
        const heads = columns.map(column => {
          const travel = Math.max(0, Math.min(1, (progress - column.delay) / column.duration));
          return -170 + travel * (height + 370);
        });
        const bandTop = Math.max(0, Math.floor(Math.min(...heads) - 150));
        const bandHeight = Math.max(1, Math.min(height, Math.ceil(Math.max(...heads) + 130)) - bandTop);
        if (canvas.height !== bandHeight) canvas.height = bandHeight;
        context.clearRect(0, 0, width, bandHeight);
        context.font = "bold 12px 'Ubuntu Mono', monospace";
        context.textBaseline = 'top';
        columns.forEach((column, index) => {
          const head = heads[index];
          const cut = Math.max(0, Math.min(height, Math.floor(head / cell) * cell));
          const x = index * cell;
          edge.push(`${x}px ${cut}px`, `${Math.min(width, x + cell)}px ${cut}px`);
          const drift = elapsed * column.speed / 1000;
          const firstRow = Math.floor((head - 150 - drift) / cell);
          const lastRow = Math.ceil((head + 115 - drift) / cell);
          for (let row = firstRow; row <= lastRow; row += 1) {
            const y = row * cell + drift;
            if (y < -cell || y > height) continue;
            const distance = Math.abs(y - head);
            const seed = column.seed + row * 7919;
            const tick = Math.floor(elapsed / (65 + hash(seed) * 80));
            const density = distance < 36 ? 1 : Math.pow(Math.max(0, 1 - (distance - 36) / 115), 1.7);
            if (hash(seed + tick * 1013) > density) continue;
            context.globalAlpha = distance < 48 ? 1 : 0.8;
            context.fillStyle = light ? '#ffffff' : '#101010';
            context.fillRect(x, y - bandTop, cell, cell);
            context.fillStyle = tones[Math.floor(hash(seed + tick * 157) * tones.length)];
            context.fillText(characters[Math.floor(hash(seed + tick * 313) * characters.length)], x + 2, y - bandTop);
          }
        });
        revealRule.style.clipPath = `polygon(${edge.join(',')},${width}px ${height}px,0 ${height}px)`;
        // A view-transition snapshot freezes canvas contents; paint its overlay background each frame.
        rainRule.style.backgroundPosition = `0 ${bandTop}px`;
        rainRule.style.backgroundSize = `${width}px ${bandHeight}px`;
        rainRule.style.backgroundImage = `url("${canvas.toDataURL()}")`;
      }
      frame = requestAnimationFrame(paint);
    }
    return { element, start, stop() {
      stopped = true;
      cancelAnimationFrame(frame);
      element.remove();
      styles.remove();
    } };
  }

  function switchTheme() {
    if (themeTransition) return;
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    if (!document.startViewTransition || reducedMotion.matches) {
      setTheme(nextTheme);
      return;
    }
    const rain = makeThemeRain(nextTheme);
    if (!rain) {
      setTheme(nextTheme);
      return;
    }
    try {
      themeTransition = document.startViewTransition(() => {
        document.body.appendChild(rain.element);
        setTheme(nextTheme);
      });
      const transition = themeTransition;
      const abort = () => transition.skipTransition();
      const cleanup = () => {
        rain.stop();
        window.removeEventListener('resize', abort);
        themeTransition = null;
      };
      window.addEventListener('resize', abort, { once: true });
      transition.ready.then(() => rain.start(abort), () => {});
      themeTransition.finished.then(cleanup, cleanup);
    } catch {
      rain.stop();
      themeTransition = null;
      setTheme(nextTheme);
    }
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
    updateThemeLabel();
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
  themeToggle.addEventListener('click', switchTheme);
  window.addEventListener('storage', event => {
    if (event.key === 'academic-theme') setTheme(event.newValue === 'light' ? 'light' : 'dark', false);
  });
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
