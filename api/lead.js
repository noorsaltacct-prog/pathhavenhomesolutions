// Vercel serverless function: texts + emails the owner on every new lead.
// Env vars (Vercel > Project > Settings > Environment Variables):
//   NTFY_TOPIC  (free phone push via ntfy.sh, recommended)
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM   (SMS)
//   RESEND_API_KEY                                        (email)
// Optional: NOTIFY_PHONE (default +16029992927), NOTIFY_EMAIL (default below), EMAIL_FROM

const NOTIFY_PHONE = process.env.NOTIFY_PHONE || '+16029992927';
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'pathhavenhomesolutions@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Pathhaven Leads <onboarding@resend.dev>';

const clean = (v, n = 300) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, n);
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function sendSms(body) {
  const { TWILIO_ACCOUNT_SID: sid, TWILIO_AUTH_TOKEN: tok, TWILIO_FROM: from } = process.env;
  if (!sid || !tok || !from) throw new Error('twilio not configured');
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: 'Basic ' + Buffer.from(`${sid}:${tok}`).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ To: NOTIFY_PHONE, From: from, Body: body })
  });
  if (!r.ok) throw new Error('twilio ' + r.status + ' ' + (await r.text()).slice(0, 200));
}

async function sendPush(title, body) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) throw new Error('ntfy not configured');
  const r = await fetch('https://ntfy.sh/' + encodeURIComponent(topic), {
    method: 'POST',
    headers: { Title: title, Priority: 'urgent', Tags: 'house' },
    body
  });
  if (!r.ok) throw new Error('ntfy ' + r.status);
}

async function sendEmail(subject, text, html, replyTo) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('resend not configured');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: EMAIL_FROM, to: [NOTIFY_EMAIL], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) })
  });
  if (!r.ok) throw new Error('resend ' + r.status + ' ' + (await r.text()).slice(0, 200));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  let d = req.body;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch { d = {}; } }
  d = d || {};

  const lead = {
    name: clean(d.name, 80), phone: clean(d.phone, 30), email: clean(d.email, 120),
    address: clean(d.address, 200), situations: clean(d.situations, 200),
    consent: clean(d.sms_consent, 5), page: clean(d.page, 200),
    source: clean(d.utm_source, 60), campaign: clean(d.utm_campaign, 60)
  };
  const digits = lead.phone.replace(/\D/g, '');
  if (lead.name.length < 2 || digits.length < 10 || lead.address.length < 5) return res.status(400).json({ ok: false, error: 'invalid' });

  const sms = [
    'NEW LEAD: Pathhaven',
    `${lead.name} ${lead.phone}`,
    lead.address,
    lead.situations && `Situation: ${lead.situations}`,
    lead.email && `Email: ${lead.email}`,
    `Text OK: ${lead.consent || 'no'}`
  ].filter(Boolean).join('\n');

  const rows = [['Name', lead.name], ['Phone', lead.phone], ['Email', lead.email], ['Address', lead.address], ['Situation', lead.situations], ['Text consent', lead.consent], ['Source', lead.source], ['Campaign', lead.campaign], ['Page', lead.page]].filter(r => r[1]);
  const text = rows.map(r => `${r[0]}: ${r[1]}`).join('\n');
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:15px">${rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${esc(r[1])}</td></tr>`).join('')}</table>`;

  const results = await Promise.allSettled([
    sendPush('New Pathhaven lead', sms),
    sendSms(sms),
    sendEmail(`New lead: ${lead.name} - ${lead.address}`, text, html, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) ? lead.email : undefined)
  ]);
  results.forEach((r, i) => { if (r.status === 'rejected') console.error(['push', 'sms', 'email'][i], r.reason && r.reason.message); });

  // Succeed if at least one channel delivered, so a lead is never lost to the visitor's screen.
  if (results.some(r => r.status === 'fulfilled')) return res.status(200).json({ ok: true });
  return res.status(502).json({ ok: false });
};
