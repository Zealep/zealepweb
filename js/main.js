/* Zealep — interacciones del sitio. Vanilla JS, sin dependencias. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  $('.year').textContent = new Date().getFullYear();

  /* ── Divide titulares en palabras para animarlas ── */
  $$('[data-split]').forEach(el => {
    let i = 0;
    [...el.childNodes].forEach(node => {
      if (node.nodeType !== 3) {
        // Un elemento pegado a la última palabra (p. ej. el cuadro rojo) viaja con ella
        const prev = node.previousSibling;
        if (prev && prev.classList?.contains('w')) prev.append(node);
        return;
      }
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(' ');
        const w = document.createElement('span');
        w.className = 'w';
        w.innerHTML = `<span style="--i:${i++}">${part}</span>`;
        frag.append(w);
      });
      node.replaceWith(frag);
    });
  });

  /* Retraso escalonado para hijos de [data-stagger] */
  $$('[data-stagger]').forEach(g => $$('[data-reveal]', g).forEach((el, i) => el.style.setProperty('--d', i % 6)));

  /* ── Preloader ── */
  const loader = $('.loader');
  const count = $('.loader-count');
  let seen = false;
  try { seen = sessionStorage.getItem('zl-seen') === '1'; sessionStorage.setItem('zl-seen', '1'); } catch (e) {}
  const loadMs = reduce ? 0 : seen ? 500 : 1300;
  const t0 = performance.now();
  (function tick(now) {
    const p = clamp((now - t0) / loadMs || 1);
    count.textContent = Math.round(p * 100);
    if (p < 1) requestAnimationFrame(tick);
    else setTimeout(start, reduce ? 0 : 150);
  })(t0);

  function start() {
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    $('.hero-title').classList.add('is-in');
    observe();
    if (!reduce) setTimeout(runPacket, 2100);
  }

  /* ── Reveals con IntersectionObserver ── */
  function observe() {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.dataset.count) countUp(e.target);
      io.unobserve(e.target);
    }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal], [data-split], .footer-logo, [data-count]').forEach(el => io.observe(el));
  }

  function countUp(el) {
    const to = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    const t = performance.now(), dur = reduce ? 1 : 1600;
    (function f(now) {
      const p = clamp((now - t) / dur);
      el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 4))) + suf;
      if (p < 1) requestAnimationFrame(f);
    })(t);
  }

  /* ── Hero: paquete que recorre la ruta y parallax ── */
  const center = $('.r-center'), packet = $('.r-packet'), block = $('.r-block');
  function runPacket() {
    const len = center.getTotalLength();
    const dur = 2400;
    let t = performance.now();
    packet.style.opacity = 1;
    (function f(now) {
      let p = (now - t) / dur;
      if (p >= 1) {
        block.classList.remove('is-hit'); void block.getBBox(); block.classList.add('is-hit');
        packet.style.opacity = 0;
        setTimeout(() => { t = performance.now(); packet.style.opacity = 1; requestAnimationFrame(f); }, 1400);
        return;
      }
      const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const pt = center.getPointAtLength(e * len);
      packet.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      requestAnimationFrame(f);
    })(t);
  }
  if (finePointer && !reduce) {
    const hero = $('.hero');
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      $$('.route-layer').forEach(l => { const d = +l.dataset.depth; l.style.transform = `translate(${x * d}px, ${y * d}px)`; });
    });
    hero.addEventListener('mouseleave', () => $$('.route-layer').forEach(l => (l.style.transform = '')));
  }

  /* ── Marquee: duplicado sin cortes, reacciona a la velocidad del scroll ── */
  const track = $('.marquee-track');
  track.innerHTML += track.innerHTML;
  let mx = 0, dir = 1, vel = 0, lastY = scrollY;

  /* ── Ruta Zealep ── */
  const ruta = $('#ruta'), rTrack = $('.ruta-track');
  const steps = $$('.step'), panels = $$('.panel'), fill = $('.steps-fill');
  steps.forEach((s, i) => { s.id = `tab-${i}`; s.setAttribute('aria-controls', `panel-${i}`); panels[i].id = `panel-${i}`; panels[i].setAttribute('aria-labelledby', `tab-${i}`); });
  const pinMQ = matchMedia('(min-width: 900px) and (min-height: 700px)');
  let active = -1, autoplay = null;
  function setStep(i, fillP = i / 4) {
    fill.style.setProperty('--p', clamp(fillP));
    if (i === active) return;
    active = i;
    steps.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.classList.toggle('is-done', k < i); s.setAttribute('aria-selected', k === i); });
    panels.forEach((p, k) => p.classList.toggle('is-on', k === i));
  }
  function pinned() { return pinMQ.matches && !reduce; }
  function applyPin() {
    ruta.classList.toggle('is-pinned', pinned());
    clearInterval(autoplay);
    if (!pinned() && !reduce) autoplay = setInterval(() => setStep((active + 1) % 5), 6000);
  }
  steps.forEach((s, i) => s.addEventListener('click', () => {
    if (pinned()) {
      const top = rTrack.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + ((i + .5) / 5) * (rTrack.offsetHeight - innerHeight), behavior: reduce ? 'auto' : 'smooth' });
    } else { clearInterval(autoplay); setStep(i); }
  }));
  pinMQ.addEventListener('change', applyPin);
  applyPin();
  setStep(0);

  /* ── Bucle de scroll ── */
  const bar = $('.scroll-progress'), nav = $('.nav'), wa = $('.wa');
  const words = $$('[data-fill]');
  const sections = $$('main section[id]');
  const links = $$('.nav-link');
  let navY = scrollY;
  function frame() {
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    const dy = y - lastY; lastY = y;
    vel += (dy - vel) * .1;
    if (Math.abs(dy) > 1) dir = dy > 0 ? 1 : -1;

    if (Math.abs(y - navY) > 8) {
      nav.classList.toggle('is-hidden', y > navY && y > 200 && !document.body.classList.contains('menu-open'));
      navY = y;
    }
    wa.classList.toggle('is-on', y > vh * .8);
    $('.hero').style.setProperty('--sy', Math.min(y, vh));

    if (!reduce) {
      mx -= (0.6 + Math.min(Math.abs(vel) * .35, 14)) * dir;
      const half = track.scrollWidth / 2;
      if (mx <= -half) mx += half; if (mx > 0) mx -= half;
      track.style.transform = `translate3d(${mx}px,0,0) skewX(${clamp(-vel * .15, -4, 4)}deg)`;
    }

    words.forEach(w => {
      const r = w.getBoundingClientRect();
      w.style.setProperty('--p', reduce ? '100%' : clamp((vh * .9 - r.top) / (vh * .45)) * 100 + '%');
    });

    if (pinned()) {
      const r = rTrack.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh));
      const a = clamp(p * 5 - .5, 0, 4);
      setStep(Math.min(4, Math.floor(p * 5)), a / 4);
    }

    let cur = null;
    sections.forEach(s => { if (s.getBoundingClientRect().top < vh * .4) cur = s.id; });
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + cur));

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ── Menú móvil ── */
  const burger = $('.nav-burger');
  function menu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    $('.menu').setAttribute('aria-hidden', !open);
  }
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { menu(false); burger.focus(); }
  });
  matchMedia('(min-width: 1081px)').addEventListener('change', e => { if (e.matches) menu(false); });
  burger.addEventListener('click', () => menu(!document.body.classList.contains('menu-open')));
  $$('.menu a').forEach(a => a.addEventListener('click', () => menu(false)));

  /* ── Cursor y botones magnéticos ── */
  if (finePointer && !reduce) {
    const cur = $('.cursor'), dot = $('.cursor-dot'), ring = $('.cursor-ring');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener('mousemove', e => {
      x = e.clientX; y = e.clientY;
      const t = e.target;
      cur.classList.toggle('is-hover', !!t.closest('a, button, .service, .stack-grid li'));
      const zone = t.closest('[data-cursor]');
      cur.classList.toggle('is-light', zone?.dataset.cursor === 'light');
      cur.classList.toggle('is-red', zone?.dataset.cursor === 'ink' || !!t.closest('.marquee, .quotes, .service-cta, .btn-primary'));
    });
    document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cur.classList.remove('is-hidden'));
    (function loop() {
      rx += (x - rx) * .18; ry += (y - ry) * .18;
      dot.style.transform = `translate(${x}px,${y}px)`;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();

    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
        el.style.transform = '';
        setTimeout(() => (el.style.transition = ''), 600);
      });
    });
  }

  /* ── Filtro de proyectos ── */
  const filters = $$('.filter'), projects = $$('.project');
  filters.forEach(f => f.setAttribute('aria-pressed', f.classList.contains('is-on')));
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => { x.classList.toggle('is-on', x === f); x.setAttribute('aria-pressed', x === f); });
    const cat = f.dataset.f;
    projects.forEach(p => p.classList.add('is-fading'));
    setTimeout(() => {
      projects.forEach(p => p.classList.toggle('is-out', cat !== 'all' && p.dataset.cat !== cat));
      requestAnimationFrame(() => requestAnimationFrame(() => projects.forEach(p => p.classList.remove('is-fading'))));
    }, 300);
  }));

  /* ── Testimonios ── */
  const quotes = $$('.quote'), qbar = $('.qbar span');
  let q = 0, qTimer, qPaused = reduce;
  const qPause = $('.qpause'), qSection = $('.quotes');
  const syncPause = () => {
    qPause.setAttribute('aria-pressed', qPaused);
    qPause.setAttribute('aria-label', qPaused ? 'Reanudar rotación automática' : 'Pausar rotación automática');
  };
  function showQuote(i) {
    q = (i + quotes.length) % quotes.length;
    quotes.forEach((el, k) => el.classList.toggle('is-on', k === q));
    qbar.classList.remove('is-run'); void qbar.offsetWidth;
    clearTimeout(qTimer);
    if (!qPaused) { qbar.classList.add('is-run'); qTimer = setTimeout(() => showQuote(q + 1), 7000); }
  }
  $$('.qbtn[data-q]').forEach(b => b.addEventListener('click', () => showQuote(q + +b.dataset.q)));
  qPause.addEventListener('click', () => { qPaused = !qPaused; syncPause(); showQuote(q); });
  // El carrusel se detiene mientras el visitante lo está leyendo o enfocando
  let qHold = false;
  const hold = on => { if (qPaused || qHold === on) return; qHold = on; if (on) { clearTimeout(qTimer); qbar.classList.remove('is-run'); } else showQuote(q); };
  qSection.addEventListener('mouseenter', () => hold(true));
  qSection.addEventListener('mouseleave', () => hold(false));
  qSection.addEventListener('focusin', () => hold(true));
  qSection.addEventListener('focusout', () => hold(false));
  syncPause();
  showQuote(0);

  /* ── Chips (selección simple o múltiple) ── */
  $$('.chips').forEach(g => {
    const multi = g.hasAttribute('data-multi');
    const sync = () => $$('.chip', g).forEach(x => x.setAttribute('aria-pressed', x.classList.contains('is-on')));
    sync();
    $$('.chip', g).forEach(c => c.addEventListener('click', () => {
      if (multi) c.classList.toggle('is-on');
      else $$('.chip', g).forEach(x => x.classList.toggle('is-on', x === c));
      sync();
      g.dispatchEvent(new Event('change', { bubbles: true }));
    }));
  });

  /* ── Estimador ── */
  const est = $('.est'), estNum = $('.est-num'), estBar = $$('.est-bar span');
  const groupVal = name => $$(`[data-group="${name}"] .chip.is-on`, est).map(c => +c.dataset.v);
  function estimate() {
    const base = groupVal('type')[0], size = groupVal('size')[0];
    const extras = groupVal('extra').reduce((a, b) => a + b, 0);
    const w = base * size + extras;
    const lo = Math.max(2, Math.round(w * .85)), hi = Math.max(lo + 1, Math.round(w * 1.2));
    estNum.textContent = `${lo}–${hi}`;
    estNum.classList.remove('is-bump'); void estNum.offsetWidth; estNum.classList.add('is-bump');
    const dev = clamp(.45 + w / 80, .45, .66);
    const parts = [.12, .18, dev, .15];
    const sum = parts.reduce((a, b) => a + b, 0);
    estBar.forEach((s, i) => s.style.setProperty('--w', (parts[i] / sum) * 100 + '%'));
    return { lo, hi };
  }
  est.addEventListener('change', estimate);
  estimate();

  const typeToNeed = ['Web / SaaS', 'App móvil', 'Web / SaaS', 'Software a medida', 'IA y datos'];
  $('.est-go').addEventListener('click', () => {
    const typeChips = $$('[data-group="type"] .chip', est);
    const ti = typeChips.findIndex(c => c.classList.contains('is-on'));
    const size = $('[data-group="size"] .chip.is-on', est).textContent;
    const extras = $$('[data-group="extra"] .chip.is-on', est).map(c => c.textContent);
    const { lo, hi } = estimate();
    $$('[data-group="need"] .chip').forEach(c => c.classList.toggle('is-on', c.textContent === typeToNeed[ti]));
    $('.form textarea').value = `${typeChips[ti].textContent} · ${size}${extras.length ? ' · ' + extras.join(', ') : ''}. Estimación: ${lo}–${hi} semanas.`;
  });

  /* ── FAQ ── */
  $$('.qa').forEach(qa => $('.qa-q', qa).addEventListener('click', () => {
    const open = !qa.classList.contains('is-open');
    $$('.qa').forEach(x => { x.classList.remove('is-open'); $('.qa-q', x).setAttribute('aria-expanded', false); });
    qa.classList.toggle('is-open', open);
    $('.qa-q', qa).setAttribute('aria-expanded', open);
  }));

  /* ── Formulario: envía a Formspree (action del form); sin configurar, abre el correo ── */
  const form = $('.form');
  const btn = $('.form-send', form), label = $('.send-label', btn), formError = $('.form-error', form);
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));

  const field = n => form.elements.namedItem(n);
  function sending(on) {
    btn.disabled = on;
    btn.classList.toggle('is-sending', on);
    label.textContent = on ? 'Enviando…' : 'Enviar requerimiento';
  }
  function showSent() {
    form.hidden = true;
    const sent = $('.sent');
    sent.hidden = false;
    sent.setAttribute('tabindex', '-1');
    sent.setAttribute('role', 'status');
    sent.focus({ preventScroll: true });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    formError.hidden = true;
    let ok = true;
    $$('.fl input', form).forEach(inp => {
      const bad = !inp.checkValidity() || !inp.value.trim();
      inp.closest('.fl').classList.toggle('is-error', bad);
      inp.setAttribute('aria-invalid', bad);
      $('.fl-err', inp.closest('.fl-wrap')).hidden = !bad;
      if (bad) ok = false;
    });
    if (!ok) return $('.fl.is-error input', form).focus();

    field('necesidades').value = $$('[data-group="need"] .chip.is-on', form).map(c => c.textContent).join(', ') || 'Sin especificar';
    if (field('_gotcha').value) return showSent(); // bot: fingimos éxito y no enviamos

    if (form.action.includes('TU_ID')) {
      const body = `Nombre: ${field('name').value}\nCorreo: ${field('email').value}\nNecesito: ${field('necesidades').value}\n\n${field('message').value}`;
      location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(field('_subject').value)}&body=${encodeURIComponent(body)}`;
      return showSent();
    }

    sending(true);
    try {
      const [res] = await Promise.all([
        fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }),
        wait(1200), // deja ver la barra de envío
      ]);
      if (!res.ok) throw new Error(res.status);
      showSent();
    } catch (err) {
      sending(false);
      formError.hidden = false;
    }
  });
  $$('.fl input', form).forEach(inp => inp.addEventListener('input', () => {
    inp.closest('.fl').classList.remove('is-error');
    inp.setAttribute('aria-invalid', false);
    $('.fl-err', inp.closest('.fl-wrap')).hidden = true;
  }));
})();
