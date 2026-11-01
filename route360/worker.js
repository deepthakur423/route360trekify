// Cloudflare Worker (free). Receives the website form and posts it to your Telegram bot/group.
// Settings (Worker > Settings > Variables):  BOT_TOKEN (secret), CHAT_ID (secret),
//   ALLOWED_ORIGIN = https://YOURNAME.github.io   (comma-separate more, e.g. your future domain)
const clip = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
    const ok = allowed.includes(origin);
    const cors = { 'Access-Control-Allow-Origin': ok ? origin : (allowed[0] || ''), 'Access-Control-Allow-Methods': 'POST, OPTIONS',
                   'Access-Control-Allow-Headers': 'Content-Type', 'Vary': 'Origin' };
    const reply = (status, body) => new Response(body, { status, headers: cors });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return reply(405, 'Method not allowed');
    if (!ok) return reply(403, 'Forbidden');

    let b; try { b = await req.json(); } catch { return reply(400, 'Bad request'); }
    if (b.website) return reply(200, 'ok');                       // spam honeypot
    const name = clip(b.name, 100), contact = clip(b.contact, 120), interest = clip(b.interest, 100);
    if (!name || !contact || !interest) return reply(400, 'Missing fields');

    const text = [
      '🏔 New inquiry - Route360Trekify', '',
      `👤 ${name}`, `📞 ${contact}`, `🎯 ${interest}`,
      b.room ? `🛏 Room: ${clip(b.room, 60)}` : null,
      `📅 Start: ${clip(b.start_date, 20) || 'flexible'}`,
      `👥 Group: ${clip(b.group_size, 10) || '-'}`,
      b.message ? `\n💬 ${String(b.message).trim().slice(0, 800)}` : null
    ].filter(l => l !== null).join('\n');

    const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text })
    });
    return reply(r.ok ? 200 : 502, r.ok ? 'ok' : 'Telegram error');
  }
};
