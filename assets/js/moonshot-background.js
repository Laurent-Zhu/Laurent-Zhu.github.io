(() => {
  'use strict';

  const canvas = document.querySelector('#space-background');
  const toggle = document.querySelector('.motion-toggle');
  if (!canvas || !toggle) return;
  let context;
  try { context = canvas.getContext('2d', { alpha: false }); } catch { return; }
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 600px)');
  const storageKey = 'moonshot-background-paused';
  let manuallyPaused = false;
  try { manuallyPaused = localStorage.getItem(storageKey) === 'true'; } catch { /* Optional preference. */ }
  let frameId = 0;
  let lastFrame = null;
  let elapsed = 0;
  let pageActive = true;
  let field;
  let shimmer;
  let stars;
  let frame;

  // Ordered dithering keeps the low-resolution clouds crisp instead of blurred.
  const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const clamp = value => Math.max(0, Math.min(1, value));
  function random(x, y, seed = 0) {
    let value = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 69069);
    value = Math.imul(value ^ (value >>> 13), 1274126177);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
  }

  function noise(x, y, seed) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    let tx = x - ix;
    let ty = y - iy;
    tx *= tx * (3 - 2 * tx);
    ty *= ty * (3 - 2 * ty);
    const upper = random(ix, iy, seed) * (1 - tx) + random(ix + 1, iy, seed) * tx;
    const lower = random(ix, iy + 1, seed) * (1 - tx) + random(ix + 1, iy + 1, seed) * tx;
    return upper * (1 - ty) + lower * ty;
  }

  function cloudNoise(x, y, seed) {
    let sum = 0;
    let weight = 0.5;
    for (let octave = 0; octave < 4; octave += 1) {
      sum += noise(x, y, seed + octave * 23) * weight;
      x = x * 2.1 + 9.2;
      y = y * 2.1 + 5.7;
      weight *= 0.5;
    }
    return sum / 0.9375;
  }

  function resize() {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const pixelSize = mobile.matches ? 4 : 5;
    const scale = Math.min(1 / pixelSize, 360 / width, 300 / height);
    const columns = Math.max(1, Math.round(width * scale));
    const rows = Math.max(1, Math.round(height * scale));
    if (frame && canvas.width === columns && canvas.height === rows) return;
    canvas.width = columns;
    canvas.height = rows;
    context.imageSmoothingEnabled = false;
    frame = context.createImageData(columns, rows);
    field = new Float32Array(columns * rows);
    shimmer = new Float32Array(columns * rows);
    stars = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const u = x / columns;
        const v = y / rows;
        const warp = cloudNoise(u * 3.5, v * 3.5, 51);
        const cloud = cloudNoise(u * 7 + warp * 2, v * 6 + warp, 82);
        const ridge = 0.65 - u * 0.24 + Math.sin(u * 7) * 0.08;
        const distance = Math.abs(v - ridge + (warp - 0.5) * 0.35);
        const band = clamp(1 - distance / 0.3);
        const index = y * columns + x;
        field[index] = clamp((cloud - 0.23) * 2.2) * band * band;
        shimmer[index] = noise(u * 12, v * 12, 124) * Math.PI * 2;
        if (random(x, y, 274) > 0.991) {
          stars.push({ index, phase: random(x, y, 92) * Math.PI * 2,
            speed: 0.35 + random(x, y, 63) * 0.55,
            brightness: 0.4 + random(x, y, 36) * 0.6 });
        }
      }
    }
    draw();
  }

  function draw() {
    const pixels = frame.data;
    const columns = canvas.width;
    // Cap luminance at #303030 so even muted 12px dates retain AA contrast.
    for (let index = 0; index < field.length; index += 1) {
      const x = index % columns;
      const y = Math.floor(index / columns);
      const pulse = Math.sin(elapsed * 0.24 + shimmer[index]) * 0.045;
      const threshold = (bayer[(y % 4) * 4 + x % 4] + 0.5) / 16;
      const level = Math.floor(clamp(field[index] + pulse * field[index]) * 4 + threshold);
      const value = 16 + level * 8;
      const offset = index * 4;
      pixels[offset] = value;
      pixels[offset + 1] = value;
      pixels[offset + 2] = value;
      pixels[offset + 3] = 255;
    }
    stars.forEach(star => {
      const brightness = star.brightness * (0.78 + Math.sin(elapsed * star.speed + star.phase) * 0.22);
      const offset = star.index * 4;
      const value = Math.max(pixels[offset], 16 + Math.round(brightness * 32));
      pixels[offset] = value;
      pixels[offset + 1] = value;
      pixels[offset + 2] = value;
    });
    context.putImageData(frame, 0, 0);
  }

  function wantsMotion() {
    return document.documentElement.dataset.theme !== 'light' && !manuallyPaused && !reducedMotion.matches;
  }

  function updateLabel() {
    const chinese = document.documentElement.lang.startsWith('zh');
    const label = reducedMotion.matches
      ? (chinese ? '\u5df2\u9075\u5faa\u7cfb\u7edf\u8bbe\u7f6e\uff1a\u51cf\u5c11\u52a8\u6001\u6548\u679c' : 'Reduced motion enabled in system settings')
      : wantsMotion()
        ? (chinese ? '\u6682\u505c\u80cc\u666f\u52a8\u753b' : 'Pause background animation')
        : (chinese ? '\u64ad\u653e\u80cc\u666f\u52a8\u753b' : 'Play background animation');
    toggle.title = label;
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('aria-disabled', String(reducedMotion.matches));
    toggle.querySelector('img').src = `assets/icons/moonshot/${wantsMotion() ? 'pause' : 'play'}.svg`;
  }

  function tick(timestamp) {
    if (lastFrame === null) lastFrame = timestamp;
    const interval = mobile.matches ? 1000 / 12 : 1000 / 20;
    if (timestamp - lastFrame >= interval) {
      elapsed += Math.min((timestamp - lastFrame) / 1000, 0.15);
      lastFrame = timestamp;
      draw();
    }
    frameId = requestAnimationFrame(tick);
  }

  function syncMotion() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrame = null;
    updateLabel();
    if (wantsMotion() && !document.hidden && pageActive) frameId = requestAnimationFrame(tick);
  }

  toggle.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    manuallyPaused = !manuallyPaused;
    try { localStorage.setItem(storageKey, String(manuallyPaused)); } catch { /* Optional preference. */ }
    syncMotion();
  });
  reducedMotion.addEventListener('change', syncMotion);
  mobile.addEventListener('change', resize);
  document.addEventListener('visibilitychange', syncMotion);
  window.addEventListener('pagehide', () => { pageActive = false; syncMotion(); });
  window.addEventListener('pageshow', () => { pageActive = true; resize(); syncMotion(); });
  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 120);
  }, { passive: true });
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'data-theme')) syncMotion();
    else updateLabel();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'data-theme'] });
  resize();
  toggle.hidden = false;
  syncMotion();
})();
