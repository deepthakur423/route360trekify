(() => {
const S = window.SITE, $ = id => document.getElementById(id), q = new URLSearchParams(location.search);
const U = id => `https://images.unsplash.com/photo-${id}?q=80&w=1920&auto=format&fit=crop`;
const D = { heroImages: [U('1464822759023-fed622ff2c3b'), U('1519681393784-d120267933ba'), U('1506744038136-46273834b3fb')],
  bandImage: U('1454496522488-7a8e488e8606'), whyImage: U('1426604966848-d7adac402bff'), bookImage: U('1519681393784-d120267933ba'), baseElevation: 7700,
  attractions: [
    { type: 'Waterfalls', name: 'Waterfall Trails', img: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1200&auto=format&fit=crop', desc: 'Follow forest paths to the waterfalls around Grahan with a local guide. Ideal for arrival afternoons and rest days between treks.' },
    { type: 'Viewpoints', name: 'Golden Hour Viewpoints', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop', desc: 'Viewpoints around the village with wide Parvati Valley views, at their best at sunrise and sunset.' }] };
Object.keys(D).forEach(k => { if (!S[k] || (Array.isArray(S[k]) && !S[k].length)) S[k] = D[k]; });
const set = (id, h) => { const e = $(id); if (e) e.innerHTML = h; return e; };
const mm = s => window.matchMedia ? window.matchMedia(s).matches : false;
const mq = S.map.query === 'Grahan Village, Himachal Pradesh' ? 'Grahan Village, Kasol, Kullu, Himachal Pradesh' : S.map.query;
const mapUrl = S.map.url || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.map.query);
const price = p => p ? `<span class="font-extrabold text-accent">${p}</span>` : `<span class="text-xs italic text-slate-500">Price on request</span>`;
const eh = v => String(v == null ? '' : v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const igSvg = c => `<svg viewBox="0 0 24 24" class="${c}" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>`;
const peakFt = t => +(String(t.alt).replace(/,/g, '').match(/\d+/) || [0])[0];
/* Illustrative 3D route (set t.route = [elevations in ft] in config.js to use real data) */
function routeAnim(cv, info, t) {
  const ctx = cv && cv.getContext && cv.getContext('2d'); if (!ctx) return () => {};
  const base = S.baseElevation, peak = peakFt(t), N = 90, Hh = 230, ZH = 90;
  let seed = [...t.key].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296, ph = rnd() * 6.28;
  const raw = Array.from({ length: N }, (_, i) => { const u = i / (N - 1); return Math.pow(Math.sin(Math.PI * u), 1.3) * (0.94 + 0.06 * Math.sin(u * 23 + ph)); }), top = Math.max(...raw);
  const elev = t.route && t.route.length > 1 ? t.route : raw.map(v => base + (peak - base) * v / top);
  const n = elev.length, lo = Math.min(...elev), hi = Math.max(...elev);
  const P = elev.map((e, i) => { const u = i / (n - 1); return { x: (u - 0.5) * 260, y: Math.sin(u * 6.9 + ph) * 45 + Math.sin(u * 9 + ph * 2) * 8, z: (e - lo) / ((hi - lo) || 1) * ZH }; });
  const dpr = Math.min(window.devicePixelRatio || 1, 2), reduceM = mm('(prefers-reduced-motion: reduce)');
  const W = () => cv.clientWidth || 600; cv.width = W() * dpr; cv.height = Hh * dpr;
  let yaw = -0.7, drag = null, p = 0, last = 0, raf = 0, run = true;
  cv.onpointerdown = e => { drag = e.clientX; }; cv.onpointermove = e => { if (drag !== null) { yaw += (e.clientX - drag) * 0.01; drag = e.clientX; } };
  cv.onpointerup = cv.onpointerleave = () => { drag = null; };
  const proj = (x, y, z) => { const c = Math.cos(yaw), s = Math.sin(yaw), X = x * c - y * s, Y = x * s + y * c, k = W() / 340; return [W() / 2 + X * k, Hh * 0.68 + (Y * 0.5 - z * 0.9) * k]; };
  const line = (a, b) => { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); };
  const draw = ts => {
    if (!run) return; const dt = Math.min(((ts - last) / 1000) || 0, 0.05); last = ts;
    if (drag === null && !reduceM) yaw += dt * 0.25;
    p = reduceM ? 1 : (p + dt / 5 > 1.25 ? 0 : p + dt / 5); const m = Math.floor(Math.min(p, 1) * (n - 1));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W(), Hh); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(255,255,255,.09)';
    for (let g = -150; g <= 150; g += 30) line(proj(g, -80, 0), proj(g, 80, 0));
    for (let g = -80; g <= 80; g += 20) line(proj(-150, g, 0), proj(150, g, 0));
    for (let i = 0; i < m; i += 2) { ctx.strokeStyle = `rgba(234,88,12,${0.08 + P[i].z / ZH * 0.25})`; line(proj(P[i].x, P[i].y, 0), proj(P[i].x, P[i].y, P[i].z)); }
    ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.shadowColor = '#EA580C'; ctx.shadowBlur = 12;
    for (let i = 1; i <= m; i++) { ctx.strokeStyle = `hsl(${30 + P[i].z / ZH * 20},95%,${52 + P[i].z / ZH * 14}%)`; line(proj(P[i - 1].x, P[i - 1].y, P[i - 1].z), proj(P[i].x, P[i].y, P[i].z)); }
    ctx.shadowBlur = 0; const [mx, my] = proj(P[m].x, P[m].y, P[m].z); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(mx, my, 5, 0, 6.3); ctx.fill();
    if (info) info.innerHTML = `▲ <b class="text-orange-300">${Math.round(elev[m]).toLocaleString('en-IN')} ft</b> <span class="text-white/50">· gain ≈ ${Math.round(hi - lo).toLocaleString('en-IN')} ft</span>`;
    if (!reduceM) raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);
  return () => { run = false; cancelAnimationFrame(raf); };
}
const logoImg = c => S.logo ? `<img src="${S.logo}" alt="Route360Trekify logo" class="${c}" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='images/Subheading.png'}else{this.remove()}">` : '';
const ig = S.instagram.map(i => `<a class="inline-flex items-center gap-1.5 hover:text-accent" target="_blank" rel="noopener" href="https://www.instagram.com/${i.user}/">${igSvg('w-4 h-4')}@${i.user}</a>`).join('');

const st = document.createElement('style');
st.textContent = `.rv{opacity:0;transform:translateY(30px);transition:opacity .8s ease,transform .8s ease}.rv.in{opacity:1;transform:none}
.slide{opacity:0;transition:opacity 1.8s ease;animation:kb 16s ease-in-out infinite alternate}.slide.on{opacity:1}
@keyframes kb{from{transform:scale(1.04)}to{transform:scale(1.16) translate(-1.5%,-1%)}}
.tilt{transition:transform .2s ease-out,box-shadow .3s;will-change:transform}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.slide{animation:none}}`;
document.head.appendChild(st);
const st2 = document.createElement('style');
st2.textContent = `h1,h2,h3{font-family:'Sora','Inter',sans-serif;letter-spacing:-.02em}
.gtext{background:linear-gradient(90deg,#FB923C,#FBBF24);-webkit-background-clip:text;background-clip:text;color:transparent}
#rot{display:inline-block;transition:opacity .4s,transform .4s}
.spot{position:relative}.spot:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(520px circle at var(--mx,50%) var(--my,50%),rgba(234,88,12,.2),transparent 60%)}.spot:hover:after{opacity:1}
.inp{width:100%;padding:.8rem 1rem;border-radius:.9rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:#fff;color-scheme:dark;transition:.2s}
.inp::placeholder{color:rgba(255,255,255,.4)}.inp:focus{outline:none;border-color:#EA580C;box-shadow:0 0 0 3px rgba(234,88,12,.3);background:rgba(255,255,255,.12)}
select.inp option{background:#0E1512;color:#fff}
.gs{padding:.6rem 1.1rem;border-radius:9999px;border:1px solid rgba(255,255,255,.2);color:#fff;font-weight:700;transition:.2s}.gs:hover{border-color:#EA580C}.gs.on{background:#EA580C;border-color:#EA580C}
.rcar{display:grid;perspective:900px}
.rslide{grid-area:1/1;opacity:0;pointer-events:none;transition:transform .8s cubic-bezier(.2,.7,.2,1),opacity .6s}
.rslide.next{transform:translateY(60px) rotateX(-70deg)}.rslide.prev{transform:translateY(-60px) rotateX(70deg)}
.rslide.on{opacity:1;transform:none;pointer-events:auto}
@media (prefers-reduced-motion:reduce){.rslide.next,.rslide.prev{transform:none}}
@keyframes pop{from{opacity:0;transform:scale(.94) translateY(12px)}to{opacity:1;transform:none}}`;
document.head.appendChild(st2);
document.querySelectorAll('[data-bg]').forEach(e => e.style.backgroundImage = `url('${S[e.dataset.bg]}')`);

set('nav', `<nav class="fixed top-0 inset-x-0 z-50 bg-ink/80 backdrop-blur-md border-b border-white/10">
 <div id="navin" class="max-w-7xl mx-auto px-4 flex items-center justify-between transition-all duration-300" style="height:80px">
  <a href="index.html" class="flex items-center gap-3">${logoImg('h-11 w-auto bg-cream/95 rounded-xl p-1')}<span class="font-extrabold text-xl text-white">Route360<span class="text-accent">Trekify</span></span></a>
  <div class="hidden md:flex items-center gap-7 text-sm font-semibold text-white/85">
   <a class="hover:text-accent transition" href="index.html#trails">Treks</a><a class="hover:text-accent transition" href="homestay.html">Greenhouse Homestay</a>
   <a class="hover:text-accent transition" href="index.html#why">Why Us</a><a class="hover:text-accent transition" href="index.html#contact">Find Us</a>
   <a href="index.html#booking" class="bg-accent hover:bg-white hover:text-ink text-white font-bold px-5 py-2 rounded-full transition">Book Now</a></div>
  <button id="mbtn" aria-label="Menu" class="md:hidden p-2 rounded-lg border border-white/25 text-white">☰</button></div>
 <div id="mmenu" class="hidden md:hidden bg-ink px-4 pb-4 text-white/90 font-semibold">
  <a class="block py-3" href="index.html#trails">Treks</a><a class="block py-3" href="homestay.html">Greenhouse Homestay</a>
  <a class="block py-3" href="index.html#why">Why Us</a><a class="block py-3" href="index.html#contact">Find Us</a>
  <a class="block py-3 text-center bg-accent text-white rounded-xl" href="index.html#booking">Book Now</a></div></nav>`);
$('mbtn').onclick = () => $('mmenu').classList.toggle('hidden');
$('mmenu').onclick = () => $('mmenu').classList.add('hidden');

set('footer', `<div class="bg-ink text-white/70 text-sm pt-14 pb-8"><div class="max-w-7xl mx-auto px-4">
 <div class="grid md:grid-cols-3 gap-10">
  <div>${logoImg('h-24 w-auto bg-cream/95 rounded-2xl p-2')}<p class="mt-4 text-white font-extrabold text-lg">Route360<span class="text-accent">Trekify</span> &amp; Greenhouse Homestay</p><p class="mt-1">Trek the Himalaya. Rest in Grahan.</p></div>
  <div><p class="text-white font-bold mb-3">Explore</p><div class="space-y-2"><a class="block hover:text-accent" href="index.html#trails">Treks</a><a class="block hover:text-accent" href="homestay.html">Greenhouse Homestay</a><a class="block hover:text-accent" href="index.html#around">Around Grahan</a><a class="block hover:text-accent" href="index.html#why">Why Us</a><a class="block hover:text-accent" href="index.html#booking">Book Now</a></div></div>
  <div><p class="text-white font-bold mb-3">Contact</p><p>${S.address}</p><p class="mt-2"><a class="hover:text-accent" href="tel:${S.phoneRaw}">${S.phone}</a></p><p><a class="hover:text-accent" href="mailto:${S.email}">${S.email}</a></p><p class="mt-3 flex flex-wrap gap-x-4 gap-y-1">${ig}</p></div></div>
 <div class="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/50">&copy; ${new Date().getFullYear()} Route360Trekify &amp; Greenhouse Homestay. All rights reserved.</div></div></div>`);

/* No-alcohol notice (plain signage style, shown under the stats band and on the homestay page) */
set('notice', `<div class="bg-[#A4231B] text-white"><div class="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-center sm:text-left">
 <svg viewBox="0 0 48 48" class="w-14 h-14 shrink-0" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="20"/><path d="M21 12h6v7l4 5v12H17V24l4-5z"/><path d="M10 38 38 10" stroke-width="4"/></svg>
 <div><p class="text-xl md:text-3xl font-extrabold uppercase tracking-wide leading-tight">Grahan is a strictly no-alcohol village</p>
 <p class="mt-1 font-semibold text-white/90">Please do not bring or consume alcohol here. Thank you for respecting our village.</p></div></div></div>`);

/* Treks + filter */
set('treks-grid', S.treks.map((t, i) => `<div class="trek-card rv" data-i="${i}" data-cat="${t.cat}" style="transition-delay:${(i % 3) * 100}ms"><article class="tilt group cursor-pointer h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-accent/20">
 <div class="relative h-52 bg-gradient-to-br from-pine to-moss overflow-hidden"><span class="absolute inset-0 flex items-center justify-center text-6xl opacity-40">⛰️</span><img src="${t.img}" alt="${t.name}" loading="lazy" class="relative w-full h-full object-cover group-hover:scale-110 transition duration-700" onerror="this.remove()">
  <div class="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"></div>
  <span class="absolute top-3 left-3 bg-accent text-white text-[10px] font-extrabold px-3 py-1 rounded-full">${t.tag}</span></div>
 <div class="p-6 flex flex-col flex-1"><h3 class="text-xl font-extrabold text-pine">${t.name}</h3>
  <p class="text-xs font-semibold text-moss uppercase tracking-wider my-2">${t.level}</p>
  <p class="text-slate-600 text-sm leading-relaxed flex-1">${t.desc}</p>
  <div class="flex justify-between text-sm text-slate-700 border-t border-sand mt-4 pt-3"><span>⏱ <b>${t.dur}</b></span><span>⛰ <b>${t.alt}</b></span></div>
  <div class="flex items-center justify-between mt-4">${price(t.price)}<a href="index.html?interest=${t.key}#booking" class="bg-ink hover:bg-accent text-white text-sm font-bold px-5 py-2 rounded-full transition">Book →</a></div></div></article></div>`).join(''));
const tabs = $('tabs');
if (tabs) {
  const apply = c => {
    tabs.querySelectorAll('button').forEach(b => b.className = 'px-5 py-2.5 rounded-full text-sm font-bold border transition ' + (b.dataset.tab === c ? 'bg-accent text-white border-accent scale-105' : 'bg-white/10 text-white border-white/25 hover:border-accent'));
    document.querySelectorAll('.trek-card').forEach(d => d.style.display = (c === 'all' || d.dataset.cat === c) ? '' : 'none');
  };
  tabs.innerHTML = [['all', 'All Trails'], ['day', 'Day Hikes'], ['multiday', 'Multi-Day'], ['custom', 'Custom']].map(([k, l]) => `<button type="button" data-tab="${k}">${l}</button>`).join('');
  tabs.onclick = e => { const b = e.target.closest('button'); if (b) apply(b.dataset.tab); };
  apply('all');
}

/* Rooms */
set('rooms-grid', S.rooms.map((r, i) => `<div class="rv" style="transition-delay:${i * 100}ms"><div class="tilt h-full bg-white rounded-3xl p-7 border border-sand shadow-lg hover:shadow-2xl">
 <div class="flex justify-between items-start"><div class="text-4xl">${r.icon}</div><span class="bg-moss/15 text-moss text-xs font-extrabold px-3 py-1 rounded-full">${r.count} ROOMS</span></div>
 <h3 class="text-xl font-extrabold text-pine mt-3">${r.name}</h3><p class="text-xs font-semibold text-moss uppercase tracking-wider my-1">${r.sleeps}</p>
 <p class="text-slate-600 text-sm leading-relaxed">${r.desc}</p><div class="mt-4">${price(r.price)}</div></div></div>`).join(''));

/* Gallery + lightbox */
const gs = $('gallery-section');
if (gs) {
  if (!S.gallery.length) gs.style.display = 'none';
  else {
const isVid = g => g.type === 'video' || g.youtube;
    const gThumb = g => g.youtube || g.poster ? `<img src="${g.youtube ? 'https://img.youtube.com/vi/' + g.youtube + '/hqdefault.jpg' : g.poster}" alt="${eh(g.alt)}" loading="lazy" class="w-full h-full object-cover hover:scale-110 transition duration-700">`
      : g.type === 'video' ? `<video src="${g.src}#t=0.5" muted playsinline preload="metadata" class="w-full h-full object-cover"></video>`
      : `<img src="${g.src}" alt="${eh(g.alt)}" loading="lazy" class="w-full h-full object-cover hover:scale-110 transition duration-700">`;
    const gMedia = g => g.youtube ? `<iframe class="w-[92vw] max-w-4xl aspect-video rounded-xl" src="https://www.youtube-nocookie.com/embed/${g.youtube}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`
      : g.type === 'video' ? `<video src="${g.src}" controls autoplay playsinline class="max-h-[85vh] max-w-full rounded-xl shadow-2xl"></video>`
      : `<img src="${g.src}" alt="${eh(g.alt)}" class="max-h-[85vh] max-w-full rounded-xl shadow-2xl">`;
    set('gallery-grid', S.gallery.map((g, i) => `<button type="button" data-i="${i}" class="rv relative aspect-square overflow-hidden rounded-2xl shadow-md">${gThumb(g)}${isVid(g) ? '<span class="absolute inset-0 flex items-center justify-center pointer-events-none"><span class="w-14 h-14 rounded-full bg-black/55 text-white text-2xl flex items-center justify-center">▶</span></span>' : ''}</button>`).join(''));
    const open = i => {
      const g = S.gallery, o = document.createElement('div'); let k = i;
      o.className = 'fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4';
      const draw = () => o.innerHTML = `<button data-a="x" class="absolute top-4 right-5 text-white text-4xl">×</button><button data-a="p" class="absolute left-3 md:left-8 text-white text-5xl">‹</button>${gMedia(g[k])}<button data-a="n" class="absolute right-3 md:right-8 text-white text-5xl">›</button>`;
      const step = d => { k = (k + d + g.length) % g.length; draw(); };
      const key = e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1); };
      const close = () => { o.remove(); removeEventListener('keydown', key); };
      o.onclick = e => { const a = e.target.dataset.a; if (a === 'n') step(1); else if (a === 'p') step(-1); else if (a === 'x' || e.target === o) close(); };
      addEventListener('keydown', key); draw(); document.body.appendChild(o);
    };
    $('gallery-grid').onclick = e => { const b = e.target.closest('button'); if (b) open(+b.dataset.i); };
  }
}

/* Attractions */
const ag = $('attractions-grid'), AT = S.attractions || [];
if (ag) { ag.className = 'grid gap-6 md:grid-cols-2 ' + (AT.length >= 3 ? 'lg:grid-cols-3' : 'max-w-5xl mx-auto');
  ag.innerHTML = AT.map((a, i) => `<article class="rv tilt group relative h-80 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-ink to-moss/60 shadow-xl" style="transition-delay:${i * 100}ms">
   ${a.img ? `<img src="${a.img}" alt="${eh(a.name)}" loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" onerror="this.remove()">` : ''}
   <div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"></div>
   <div class="absolute bottom-0 p-6"><span class="text-[10px] font-extrabold tracking-widest uppercase bg-accent px-3 py-1 rounded-full">${eh(a.type)}</span>
    <h3 class="text-2xl font-extrabold mt-3">${eh(a.name)}</h3><p class="text-white/75 text-sm mt-2">${eh(a.desc)}</p>
    <a href="index.html?interest=custom#booking" class="inline-block mt-4 text-orange-300 font-bold text-sm hover:text-white">Plan a visit →</a></div></article>`).join(''); }

/* Reviews bar */
const rs = $('reviews-section'), R = S.reviews || [], demo = q.get('demo') === 'reviews';
const HL = ['Guided by local people who know these trails', 'Sleep in an old Kath Kuni house at 7,700 ft', 'Home-cooked meals, mostly vegetarian', 'No cellular network: just the mountains, with WiFi when you need it'].map(text => ({ source: 'highlight', text }));
const DEMO = [{ source: 'google', rating: 5, demo: 1, name: 'Sample guest', text: 'This is a sample review, shown only to preview the layout.' },
  { source: 'instagram', demo: 1, name: '@sample_handle', text: 'Sample Instagram comment for the layout preview.' },
  { source: 'website', rating: 5, demo: 1, name: 'Sample guest', text: 'Sample guest feedback for the layout preview.' }];
const L = R.length ? R : demo ? DEMO : HL;
if (rs) {
  const SRC = { google: ['<span class="inline-flex w-5 h-5 items-center justify-center rounded-full bg-white text-[#4285F4] text-xs font-black">G</span>', 'Google review'],
    instagram: [igSvg('w-5 h-5'), 'Instagram comment'], website: ['<span>💬</span>', 'Guest review'], highlight: ['<span>✨</span>', 'Life at Greenhouse &amp; Route360'] };
  const eb = $('review-eyebrow'); if (eb) eb.textContent = R.length ? 'What our guests say' : demo ? 'Demo preview: sample reviews, not real' : 'Welcome to Grahan';
  const card = $('review-card'), dots = $('review-dots'), n = L.length; let k = 0, timer = 0, sx = null;
  card.innerHTML = L.map(r => { const sc = SRC[r.source] || SRC.website; return `<div class="rslide text-center px-2"><div class="flex items-center justify-center gap-2 text-sm font-semibold text-white/80">${sc[0]}${sc[1]}${r.demo ? ' · SAMPLE' : ''}</div>
    ${r.rating ? `<div class="text-orange-300 text-xl mt-2 tracking-widest">${'★'.repeat(Math.round(r.rating))}</div>` : ''}
    <p class="text-xl md:text-3xl font-semibold leading-snug mt-3">${r.source === 'highlight' ? eh(r.text) : '“' + eh(r.text) + '”'}</p>
    ${r.name ? `<p class="mt-4 text-white/70">— ${r.url ? `<a class="underline hover:text-white" target="_blank" rel="noopener" href="${r.url}">${eh(r.name)}</a>` : eh(r.name)}${r.date ? ', ' + eh(r.date) : ''}</p>` : ''}</div>`; }).join('');
  const slides = [...card.querySelectorAll('.rslide')];
  dots.innerHTML = L.map((_, i) => `<button type="button" data-i="${i}" aria-label="Go to slide ${i + 1}" class="w-2.5 h-2.5 rounded-full bg-white/30 transition"></button>`).join('');
  const show = i => { k = (i + n) % n;
    slides.forEach((sl, j) => { const off = (j - k + n) % n; sl.className = 'rslide text-center px-2 ' + (off === 0 ? 'on' : off <= n / 2 ? 'next' : 'prev'); });
    dots.querySelectorAll('button').forEach((d, j) => d.className = 'w-2.5 h-2.5 rounded-full transition ' + (j === k ? 'bg-accent scale-125' : 'bg-white/30')); };
  const play = () => { clearInterval(timer); if (n > 1) timer = setInterval(() => show(k + 1), 4500); };
  const go = d => { show(k + d); play(); };
  dots.onclick = e => { const b = e.target.closest('button'); if (b) { show(+b.dataset.i); play(); } };
  const pv = $('review-prev'), nx = $('review-next'); if (pv) pv.onclick = () => go(-1); if (nx) nx.onclick = () => go(1);
  if (n < 2) [pv, nx, dots].forEach(el => el && (el.style.display = 'none'));
  card.onpointerdown = e => { sx = e.clientX; };
  card.onpointerup = e => { if (sx !== null && Math.abs(e.clientX - sx) > 40) go(e.clientX < sx ? 1 : -1); sx = null; };
  rs.onmouseenter = () => clearInterval(timer); rs.onmouseleave = play;
  const igl = S.instagram.map(i => `<a class="underline hover:text-white" target="_blank" rel="noopener" href="https://www.instagram.com/${i.user}/">@${i.user}</a>`).join(' · ');
  const links = R.length ? (S.googleReviewsUrl ? `<a class="underline hover:text-white" target="_blank" rel="noopener" href="${S.googleReviewsUrl}">Read all Google reviews</a>` : '')
    : `Stayed with us? Share your experience ${S.googleReviewsUrl ? `on <a class="underline hover:text-white" target="_blank" rel="noopener" href="${S.googleReviewsUrl}">Google</a> or ` : ''}on Instagram: ${igl}`;
  if ($('review-links')) $('review-links').innerHTML = links;
  show(0); play();
}

/* Map + contact */
const dirUrl = S.map.url || 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mq);
set('map', `<div class="rv grid md:grid-cols-[370px_1fr] rounded-[2rem] overflow-hidden shadow-2xl bg-ink">
 <div class="p-8 text-white flex flex-col gap-5 bg-gradient-to-b from-ink to-pine">
  <div><span class="text-orange-300 text-xs font-bold tracking-widest uppercase">Visit us</span><h3 class="text-2xl font-extrabold mt-1">Greenhouse Homestay</h3>
   <p class="flex gap-2 text-white/70 text-sm mt-3"><svg viewBox="0 0 24 24" class="w-5 h-5 shrink-0 text-orange-300" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><span>${S.address}</span></p></div>
  <a href="${dirUrl}" target="_blank" rel="noopener" class="text-center bg-accent hover:bg-orange-500 font-bold rounded-full py-3 transition shadow-lg shadow-accent/30">Get Directions ↗</a>
  <div class="space-y-3 text-sm">
   <a href="tel:${S.phoneRaw}" class="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-2xl px-4 py-3 transition"><svg viewBox="0 0 24 24" class="w-5 h-5 shrink-0 text-orange-300" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg><span><b class="block text-white/50 text-[10px] tracking-widest uppercase">Call / WhatsApp</b>${S.phone}</span></a>
   <a href="mailto:${S.email}" class="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-2xl px-4 py-3 transition break-all"><svg viewBox="0 0 24 24" class="w-5 h-5 shrink-0 text-orange-300" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span><b class="block text-white/50 text-[10px] tracking-widest uppercase">Email</b>${S.email}</span></a></div>
  <div class="mt-auto"><b class="block text-white/50 text-[10px] tracking-widest uppercase mb-2">Follow along</b><div class="flex flex-wrap gap-2">
   ${S.instagram.map(i => `<a class="inline-flex items-center gap-2 bg-white/10 hover:bg-accent px-4 py-2 rounded-full text-sm font-semibold transition" target="_blank" rel="noopener" href="https://www.instagram.com/${i.user}/">${igSvg('w-4 h-4')}@${i.user}</a>`).join('')}</div></div>
 </div>
 <iframe title="Map of Grahan Village" class="w-full h-80 md:h-full md:min-h-[460px] block" loading="lazy" src="${S.map.embed || 'https://www.google.com/maps?q=' + encodeURIComponent(mq) + '&output=embed'}"></iframe></div>`);

/* Booking form -> your Telegram bot/group (via the Worker) */
const f = $('inquiry');
if (f) {
  const opts = [...S.treks.map(t => [t.key, t.name]), ['homestay', S.homestay]], p = q.get('interest');
  const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  $('interest').innerHTML = '<option value="" disabled>Choose your trail or stay...</option>' + opts.map(([k, n]) => `<option value="${k}">${n}</option>`).join('');
  $('interest').value = opts.some(o => o[0] === p) ? p : '';
  $('room').innerHTML = '<option value="">No preference</option>' + S.rooms.map(r => `<option>${r.name}</option>`).join('');
  $('start_date').min = new Date().toISOString().slice(0, 10);
  const gs = $('gsize'), pick = v => { $('group_size').value = v; gs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === v)); };
  gs.onclick = e => { const b = e.target.closest('button'); if (b) pick(b.dataset.v); }; pick('1-2');
  const show = (good, html) => {
    const r = $('result');
    r.className = 'mb-5 p-4 rounded-xl text-sm border ' + (good ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-100' : 'bg-red-500/15 border-red-400/50 text-red-100');
    r.innerHTML = html; if (r.scrollIntoView) r.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f)); if (d.website) return;
    const btn = $('submitBtn'), label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending...';
    try {
      if (!S.inquiryEndpoint) throw new Error('endpoint not set');
      const r = await fetch(S.inquiryEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: d.name, contact: d.contact, interest: (opts.find(o => o[0] === d.interest) || [])[1] || d.interest,
          room: d.room || '', start_date: d.start_date || '', group_size: d.group_size || '', message: d.message || '', website: '' }) });
      if (!r.ok) throw new Error('bad status ' + r.status);
      show(true, `<b>Inquiry sent!</b> Thank you, ${esc(d.name)}. Our team in Grahan will contact you shortly.`);
      f.reset(); $('interest').value = ''; pick('1-2');
    } catch (err) {
      console.error('Inquiry failed:', err);
      show(false, `We couldn't send your inquiry just now. Please call or WhatsApp <a class="font-bold underline" href="tel:${S.phoneRaw}">${S.phone}</a> or email <a class="font-bold underline" href="mailto:${S.email}">${S.email}</a>.`);
    } finally { btn.disabled = false; btn.textContent = label; }
  });
}

/* Motion & interactivity */
const reduce = mm('(prefers-reduced-motion: reduce)');
const totalRooms = S.rooms.reduce((n, r) => n + r.count, 0), totalTreks = S.treks.filter(t => t.cat !== 'custom').length;
document.querySelectorAll('.room-total').forEach(e => { e.dataset.to = totalRooms; e.textContent = totalRooms; });
document.querySelectorAll('.trek-total').forEach(e => { e.dataset.to = totalTreks; e.textContent = totalTreks; });

const hs = $('hero-slides');
if (hs) {
  hs.innerHTML = S.heroImages.map((u, i) => `<div class="slide absolute inset-0 bg-cover bg-center ${i ? '' : 'on'}" style="background-image:url('${u}')"></div>`).join('');
  let n = 0;
  if (S.heroImages.length > 1 && !reduce) setInterval(() => { const s = hs.children; s[n].classList.remove('on'); n = (n + 1) % s.length; s[n].classList.add('on'); }, 6500);
}

const count = el => { const to = +el.dataset.to, t0 = performance.now();
  const f = t => { const p = Math.min((t - t0) / 1800, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN'); if (p < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f); };
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.classList.contains('count')) count(e.target); io.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll('.rv,.count').forEach(e => io.observe(e));
} else document.querySelectorAll('.rv').forEach(e => e.classList.add('in'));

if (mm('(hover: hover)') && !reduce) ['treks-grid', 'rooms-grid'].forEach(id => {
  const g = $(id); if (!g) return;
  g.addEventListener('mousemove', e => { const c = e.target.closest('.tilt'); if (!c) return;
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-6px)`; });
  g.addEventListener('mouseout', e => { const c = e.target.closest('.tilt'); if (c && !c.contains(e.relatedTarget)) c.style.transform = ''; });
});

const bar = document.createElement('div'); bar.className = 'fixed top-0 left-0 h-1 bg-accent z-[60]'; bar.style.width = '0'; document.body.appendChild(bar);
const top = document.createElement('button'); top.title = 'Back to top'; top.innerHTML = '↑';
top.className = 'fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-accent text-white text-xl font-bold shadow-xl transition-opacity duration-300 hover:bg-white hover:text-ink';
top.style.opacity = '0'; top.style.pointerEvents = 'none'; top.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' }); document.body.appendChild(top);
const px = [...document.querySelectorAll('.px')], navin = $('navin'); let busy = false;
const upd = () => {
  busy = false; const y = window.scrollY, vh = window.innerHeight, max = document.documentElement.scrollHeight - vh;
  bar.style.width = (max > 0 ? y / max * 100 : 0) + '%'; if (navin) navin.style.height = y > 40 ? '64px' : '80px';
  top.style.opacity = y > 700 ? '1' : '0'; top.style.pointerEvents = y > 700 ? 'auto' : 'none';
  if (!reduce) px.forEach(e => { const r = e.parentElement.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
    e.style.transform = `translate3d(0,${(-(r.top + r.height / 2 - vh / 2) * (+e.dataset.speed || .12)).toFixed(1)}px,0)`; });
};
addEventListener('scroll', () => { if (!busy) { busy = true; requestAnimationFrame(upd); } }, { passive: true });
addEventListener('resize', upd); upd();

const rot = $('rot');
if (rot && !reduce) { const w = ['Peaks', 'Meadows', 'Sunrises', 'Stars', 'Silence']; let k = 0;
  setInterval(() => { rot.style.opacity = '0'; rot.style.transform = 'translateY(-14px)';
    setTimeout(() => { k = (k + 1) % w.length; rot.textContent = w[k]; rot.style.transition = 'none'; rot.style.transform = 'translateY(14px)'; void rot.offsetWidth; rot.style.transition = ''; rot.style.opacity = '1'; rot.style.transform = 'none'; }, 400); }, 2600); }
if (mm('(hover: hover)') && !reduce) {
  document.querySelectorAll('.spot').forEach(el => el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));
  document.querySelectorAll('.mag').forEach(m => {
    m.addEventListener('mousemove', e => { const r = m.getBoundingClientRect(); m.style.setProperty('--tw-translate-x', ((e.clientX - r.left - r.width / 2) * .2) + 'px'); m.style.setProperty('--tw-translate-y', ((e.clientY - r.top - r.height / 2) * .3) + 'px'); });
    m.addEventListener('mouseleave', () => { m.style.removeProperty('--tw-translate-x'); m.style.removeProperty('--tw-translate-y'); });
  });
}
const tgrid = $('treks-grid');
if (tgrid) tgrid.addEventListener('click', e => {
  if (e.target.closest('a')) return;
  const c = e.target.closest('.trek-card'), t = c && S.treks[+c.dataset.i]; if (!t) return;
  const hasRoute = t.cat !== 'custom' && peakFt(t) > S.baseElevation;
  const o = document.createElement('div'); o.className = 'fixed inset-0 z-[100] bg-ink/90 backdrop-blur flex items-center justify-center p-4';
  let stopRoute = () => {}; const key = ev => { if (ev.key === 'Escape') close(); }, close = () => { stopRoute(); o.remove(); removeEventListener('keydown', key); };
  o.innerHTML = `<div class="relative w-full max-w-3xl max-h-[92vh] overflow-auto bg-ink border border-white/15 rounded-3xl shadow-2xl text-white grid md:grid-cols-2" style="animation:pop .35s ease">
   <div class="h-56 md:h-auto bg-cover bg-center" style="background-image:url('${t.img}')"></div>
   <div class="p-7"><span class="bg-accent text-[10px] font-extrabold px-3 py-1 rounded-full">${t.tag}</span><h3 class="text-3xl font-extrabold mt-3">${t.name}</h3>
    <p class="text-orange-300 text-xs font-bold uppercase tracking-wider mt-1">${t.level}</p><p class="text-white/75 text-sm leading-relaxed mt-3">${t.desc}</p>
    <div class="grid grid-cols-2 gap-3 mt-5 text-sm"><div class="bg-white/10 rounded-xl p-3">⏱ <b>${t.dur}</b></div><div class="bg-white/10 rounded-xl p-3">⛰ <b>${t.alt}</b></div></div>
    <div class="flex items-center justify-between mt-6"><div>${t.price ? `<b class="text-orange-300 text-xl">${t.price}</b>` : '<span class="text-white/50 text-sm italic">Price on request</span>'}</div>
     <a href="index.html?interest=${t.key}#booking" class="bg-accent hover:bg-orange-500 font-bold px-6 py-3 rounded-full transition">Book this →</a></div></div>
   ${hasRoute ? `<div class="md:col-span-2 relative border-t border-white/10 bg-black/40"><canvas id="route3d" class="w-full block" style="height:230px;touch-action:none"></canvas><div id="route-info" class="absolute left-4 top-3 text-xs text-white"></div><p class="absolute bottom-2 right-3 text-[10px] text-white/40">Illustrative 3D profile · drag to rotate</p></div>` : ''}
   <button data-close aria-label="Close" class="absolute top-3 right-4 text-3xl text-white">×</button></div>`;
  o.onclick = ev => { if (ev.target === o || ev.target.closest('[data-close]')) close(); };
  addEventListener('keydown', key); document.body.appendChild(o);
  if (hasRoute) stopRoute = routeAnim($('route3d'), $('route-info'), t);
});
})();
