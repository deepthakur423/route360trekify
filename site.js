(() => {
const S = window.SITE, $ = id => document.getElementById(id), q = new URLSearchParams(location.search);
const U = id => `https://images.unsplash.com/photo-${id}?q=80&w=1920&auto=format&fit=crop`;
const D = { heroImages: [U('1464822759023-fed622ff2c3b'), U('1519681393784-d120267933ba'), U('1506744038136-46273834b3fb')],
  bandImage: U('1454496522488-7a8e488e8606'), whyImage: U('1426604966848-d7adac402bff'), bookImage: U('1519681393784-d120267933ba') };
Object.keys(D).forEach(k => { if (!S[k] || (Array.isArray(S[k]) && !S[k].length)) S[k] = D[k]; });
const set = (id, h) => { const e = $(id); if (e) e.innerHTML = h; return e; };
const mm = s => window.matchMedia ? window.matchMedia(s).matches : false;
const mapUrl = S.map.url || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.map.query);
const price = p => p ? `<span class="font-extrabold text-accent">${p}</span>` : `<span class="text-xs italic text-slate-500">Price on request</span>`;
const logoImg = c => S.logo ? `<img src="${S.logo}" alt="Route360Trekify logo" class="${c}" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='images/Subheading.png'}else{this.remove()}">` : '';
const ig = S.instagram.map(i => `<a class="hover:text-accent" target="_blank" rel="noopener" href="https://www.instagram.com/${i.user}/">@${i.user}</a>`).join(' · ');

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
  <div><p class="text-white font-bold mb-3">Explore</p><div class="space-y-2"><a class="block hover:text-accent" href="index.html#trails">Treks</a><a class="block hover:text-accent" href="homestay.html">Greenhouse Homestay</a><a class="block hover:text-accent" href="index.html#why">Why Us</a><a class="block hover:text-accent" href="index.html#booking">Book Now</a></div></div>
  <div><p class="text-white font-bold mb-3">Contact</p><p>${S.address}</p><p class="mt-2"><a class="hover:text-accent" href="tel:${S.phoneRaw}">${S.phone}</a></p><p><a class="hover:text-accent" href="mailto:${S.email}">${S.email}</a></p><p class="mt-2">📸 ${ig}</p></div></div>
 <div class="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/50">&copy; ${new Date().getFullYear()} Route360Trekify &amp; Greenhouse Homestay. All rights reserved.</div></div></div>`);

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
    set('gallery-grid', S.gallery.map((g, i) => `<button type="button" data-i="${i}" class="rv aspect-square overflow-hidden rounded-2xl shadow-md"><img src="${g.src}" alt="${g.alt || ''}" loading="lazy" class="w-full h-full object-cover hover:scale-110 transition duration-700"></button>`).join(''));
    const open = i => {
      const g = S.gallery, o = document.createElement('div'); let k = i;
      o.className = 'fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4';
      const draw = () => o.innerHTML = `<button data-a="x" class="absolute top-4 right-5 text-white text-4xl">×</button><button data-a="p" class="absolute left-3 md:left-8 text-white text-5xl">‹</button><img src="${g[k].src}" alt="${g[k].alt || ''}" class="max-h-[85vh] max-w-full rounded-xl shadow-2xl"><button data-a="n" class="absolute right-3 md:right-8 text-white text-5xl">›</button>`;
      const step = d => { k = (k + d + g.length) % g.length; draw(); };
      const key = e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1); };
      const close = () => { o.remove(); removeEventListener('keydown', key); };
      o.onclick = e => { const a = e.target.dataset.a; if (a === 'n') step(1); else if (a === 'p') step(-1); else if (a === 'x' || e.target === o) close(); };
      addEventListener('keydown', key); draw(); document.body.appendChild(o);
    };
    $('gallery-grid').onclick = e => { const b = e.target.closest('button'); if (b) open(+b.dataset.i); };
  }
}

/* Map + contact */
set('map', `<iframe title="Map" class="w-full h-80 rounded-2xl border border-sand" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(S.map.query)}&output=embed"></iframe>
 <a href="${mapUrl}" target="_blank" rel="noopener" class="inline-block mt-3 bg-pine hover:bg-accent text-white font-bold px-6 py-3 rounded-full transition">📍 Open in Google Maps</a>`);
set('contact-info', `<div class="bg-white p-4 rounded-2xl border border-sand"><b class="block text-pine">Basecamp & Homestay</b>${S.address}</div>
 <div class="bg-white p-4 rounded-2xl border border-sand"><b class="block text-pine">Phone / WhatsApp</b><a class="hover:text-accent" href="tel:${S.phoneRaw}">${S.phone}</a></div>
 <div class="bg-white p-4 rounded-2xl border border-sand"><b class="block text-pine">Email</b><a class="hover:text-accent" href="mailto:${S.email}">${S.email}</a></div>
 <div class="bg-white p-4 rounded-2xl border border-sand"><b class="block text-pine">Instagram</b>${S.instagram.map(i => `<a class="hover:text-accent" target="_blank" rel="noopener" href="https://www.instagram.com/${i.user}/">@${i.user}</a> <span class="text-slate-400">(${i.label})</span>`).join('<br>')}</div>`);

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
  const o = document.createElement('div'); o.className = 'fixed inset-0 z-[100] bg-ink/90 backdrop-blur flex items-center justify-center p-4';
  const key = ev => { if (ev.key === 'Escape') close(); }, close = () => { o.remove(); removeEventListener('keydown', key); };
  o.innerHTML = `<div class="relative w-full max-w-3xl max-h-[92vh] overflow-auto bg-ink border border-white/15 rounded-3xl shadow-2xl text-white grid md:grid-cols-2" style="animation:pop .35s ease">
   <div class="h-56 md:h-auto bg-cover bg-center" style="background-image:url('${t.img}')"></div>
   <div class="p-7"><span class="bg-accent text-[10px] font-extrabold px-3 py-1 rounded-full">${t.tag}</span><h3 class="text-3xl font-extrabold mt-3">${t.name}</h3>
    <p class="text-orange-300 text-xs font-bold uppercase tracking-wider mt-1">${t.level}</p><p class="text-white/75 text-sm leading-relaxed mt-3">${t.desc}</p>
    <div class="grid grid-cols-2 gap-3 mt-5 text-sm"><div class="bg-white/10 rounded-xl p-3">⏱ <b>${t.dur}</b></div><div class="bg-white/10 rounded-xl p-3">⛰ <b>${t.alt}</b></div></div>
    <div class="flex items-center justify-between mt-6"><div>${t.price ? `<b class="text-orange-300 text-xl">${t.price}</b>` : '<span class="text-white/50 text-sm italic">Price on request</span>'}</div>
     <a href="index.html?interest=${t.key}#booking" class="bg-accent hover:bg-orange-500 font-bold px-6 py-3 rounded-full transition">Book this →</a></div></div>
   <button data-close aria-label="Close" class="absolute top-3 right-4 text-3xl text-white">×</button></div>`;
  o.onclick = ev => { if (ev.target === o || ev.target.closest('[data-close]')) close(); };
  addEventListener('keydown', key); document.body.appendChild(o);
});
})();
