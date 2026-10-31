/* Pathhaven Home Solutions. Vanilla JS, no dependencies. */

/* ================= CONFIG: edit everything here ================= */
const CONFIG = {
  brand: 'Pathhaven Home Solutions',
  legalEntity: '',            // e.g. 'Pathhaven Home Solutions LLC'. Leave '' to show the brand name
  phone: '',                  // e.g. '(949) 555-0123'. Leave '' to hide all call/text buttons
  email: '',                  // e.g. 'offers@yourdomain.com'. Leave '' to hide
  hours: '',                  // e.g. 'Mon to Sat, 8am to 8pm PT'. Leave '' to hide
  offerTime: 'within 24 hours', // promise shown in the hero and CTA. Only keep what you can deliver
  // REQUIRED BEFORE LAUNCH: your form endpoint (Formspree, Web3Forms, or your own webhook).
  // Example: 'https://formspree.io/f/xxxxxxx'
  formEndpoint: '',
  stateDisclosure: '',        // optional extra state-specific disclosure text for the footer
  areas: [
    { abbr: 'CA', name: 'Southern California', detail: 'Los Angeles, Orange, Riverside, San Bernardino, San Diego and nearby counties', type: 'Houses' },
    { abbr: 'GA', name: 'Georgia', detail: 'Metro Atlanta and surrounding areas', type: 'Houses' },
    { abbr: 'FL', name: 'Florida', detail: 'Statewide inquiries welcome', type: 'Houses' },
    { abbr: 'TX', name: 'Texas', detail: 'Statewide inquiries welcome', type: 'Houses' },
    { abbr: 'AR', name: 'Arkansas', detail: 'Northwest Arkansas, Benton County and nearby', type: 'Houses + land' }
  ],
  // Add REAL testimonials only. The section stays hidden while this array is empty.
  // { quote: '...', name: 'First name, City', situation: 'Probate' }
  testimonials: []
};

/* ================= Situations ================= */
const SITUATIONS = [
  { tab: 'Probate & inherited homes', h: 'You inherited a house. Now you have to decide what to do with it.', p: 'An estate is hard enough without a property to look after. We work with the executor, the estate attorney and every heir, including heirs who live out of state, so the sale stays simple.', b: ['We buy as-is, no cleanout or repairs', 'We coordinate with the estate’s attorney', 'Closing date that fits the court timeline'] },
  { tab: 'Divorce', h: 'Selling together shouldn’t mean fighting about it.', p: 'A fast, quiet cash sale means no staging, no open houses and no months of keeping the home show-ready. You both sign once, and the proceeds are divided the way your agreement says.', b: ['No showings or strangers walking through', 'One closing, clear paperwork for both sides', 'Works around your attorneys’ timeline'] },
  { tab: 'Pre-foreclosure', h: 'Behind on payments? Sell before it becomes a bigger problem.', p: 'If you’ve received a notice of default, time matters. A cash sale can close before the auction date, which may protect your credit and leave you with the equity you have instead of losing it.', b: ['A fast offer so you have options early', 'An honest answer if selling isn’t your best move', 'Your lender is paid off, you keep what’s left'] },
  { tab: 'Foreclosure auction', h: 'The auction date is close. Here’s what may still be possible.', p: 'With a date on the calendar, we move quickly: a call, a fast offer, and a closing scheduled ahead of it when the timeline allows. The sooner you reach out, the more options you have.', b: ['Same-day conversations', 'Fast closings when the timeline allows', 'Straight answers about what’s realistic'] },
  { tab: 'Back taxes & liens', h: 'Tax bills and liens don’t go away by waiting.', p: 'We look at what’s owed, work with the title company to pay liens and back taxes from the sale proceeds, and show you what’s left for you before you commit to anything.', b: ['Liens and back taxes paid at closing', 'Clear numbers up front', 'No upfront cost to you'] },
  { tab: 'Tired landlord', h: 'Done with tenants and repairs? Sell the rental as it sits.', p: 'Whether your tenant is paying, late or refusing to leave, we can look at buying with tenants in place or after they’re out. No more midnight calls, no more surprise repair bills.', b: ['Occupied or vacant, we buy as-is', 'No need to fix up the unit', 'One clean exit from a rental you’re done with'] },
  { tab: 'Vacant property', h: 'An empty house costs money every month.', p: 'Taxes, insurance, utilities and break-in risk add up quickly. We buy vacant properties as they are, including ones you haven’t been inside in years.', b: ['No need to live nearby', 'Any condition', 'A quick close ends the carrying costs'] },
  { tab: 'Code violations', h: 'City fines piling up? Hand the problem to us.', p: 'Violations and fines can climb fast. We can buy the property with the violations still on it and take care of them after closing.', b: ['We take on the violations', 'No repairs or inspections on your end', 'A straightforward sale, any condition'] },
  { tab: 'Fire, flood & storm damage', h: 'Damage you can’t afford to fix is still sellable.', p: 'Fire, flood, water, storm or simply years of wear. We buy as-is, even when the property is unsafe, unfinished or hard to insure.', b: ['No cleanup or rebuild needed', 'Insurance claims don’t have to be settled first', 'A clear offer, quickly'] },
  { tab: 'Major repairs needed', h: 'Don’t fix it. Don’t clean it. Just sell it.', p: 'Foundation, roof, mold, outdated everything, or a house packed to the ceiling. Leave it exactly as it is. We deal with it, and we never judge.', b: ['Leave belongings you don’t want', 'No contractors, no estimates', 'Judgment-free, always'] },
  { tab: 'Relocation & job transfer', h: 'New city, new job, old house in the way.', p: 'You can’t be in two places at once. We close on your schedule, remotely, so you can focus on the move instead of the listing.', b: ['Everything by phone, text and e-sign', 'No trips back to the property', 'Closing date lined up with your move'] },
  { tab: 'Downsizing & senior moves', h: 'Moving on to the next chapter, without the stress.', p: 'Whether it’s assisted living, a smaller place or moving in with family, we make selling patient and simple. We’re happy to work with family members and attorneys too.', b: ['Time to move at your own pace', 'Family and attorneys welcome on the call', 'No staging, no showings'] },
  { tab: 'Medical or financial hardship', h: 'When life gets heavy, the house shouldn’t.', p: 'Hardship can make a mortgage, repairs or upkeep impossible. A quick, clean sale can lift that weight. We keep it private, respectful and pressure-free.', b: ['No need to share personal details', 'Simple, fast, discreet', 'Honest options, no pressure'] },
  { tab: 'Bankruptcy', h: 'Selling during bankruptcy takes the right process.', p: 'We work with your attorney and follow the requirements of the trustee and the court. Reach out first, then let your attorney guide the timing.', b: ['We work through your attorney', 'Paperwork handled by a title company', 'Clear, honest timelines'] },
  { tab: 'Title problems', h: 'Unclear ownership? Let’s sort it out.', p: 'Missing heirs, old liens, unpaid contractors, a transfer that was never finished. Title problems scare off many buyers. We work through complicated titles together with a title company.', b: ['We review the title early', 'A title company handles the cleanup', 'Straight answers on what’s possible'] },
  { tab: 'Unwanted rental or second home', h: 'Own a house you never really wanted?', p: 'An inherited rental, an old starter home, or a second property that’s become a burden. We buy it as-is so you can stop paying for it.', b: ['No need to prep it or rent it out', 'No agent, no listing', 'Stop the monthly drain'] },
  { tab: 'Vacant land & lots', h: 'Land you don’t use? Turn it into cash.', p: 'We buy vacant land and lots, especially in Arkansas. No listing, no waiting around for the right buyer, and no obligation to accept our offer.', b: ['Rural, infill and out-of-state owners welcome', 'No need to clear or survey it first', 'A clear cash offer'] },
  { tab: 'Something else', h: 'Your situation doesn’t fit a category? That’s fine.', p: 'Tell us what’s going on. If we can help, we’ll make you an offer. If we can’t, or if listing is the better move, we’ll say so.', b: ['Every situation is different', 'No judgment', 'An honest answer either way'] }
];

/* ================= helpers ================= */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const digits = s => String(s || '').replace(/\D/g, '');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
window.dataLayer = window.dataLayer || [];
const track = (event, data = {}) => window.dataLayer.push({ event, ...data });
const root = document.documentElement;

/* ================= CONFIG -> DOM ================= */
(function applyConfig() {
  const d = digits(CONFIG.phone);
  if (d.length >= 10) {
    root.classList.add('has-phone');
    $$('[data-phone-text]').forEach(a => { a.textContent = CONFIG.phone; a.href = 'tel:+1' + d.slice(-10); });
    $$('[data-phone-call]').forEach(a => { a.href = 'tel:+1' + d.slice(-10); });
    $$('[data-sms]').forEach(a => { a.href = 'sms:+1' + d.slice(-10); });
  }
  if (CONFIG.email) {
    root.classList.add('has-email');
    $$('[data-email-text]').forEach(a => { a.textContent = CONFIG.email; a.href = 'mailto:' + CONFIG.email; });
  }
  $$('[data-hours]').forEach(e => { e.textContent = CONFIG.hours; });
  $$('[data-offer-time]').forEach(e => { e.textContent = CONFIG.offerTime; });
  if (CONFIG.legalEntity) $$('[data-entity]').forEach(e => { e.textContent = CONFIG.legalEntity; });
  const sd = $('[data-state-disclosure]');
  if (CONFIG.stateDisclosure && sd) { sd.textContent = CONFIG.stateDisclosure; sd.hidden = false; }
  $('#yr').textContent = new Date().getFullYear();
})();

/* ================= hero intro ================= */
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('loaded')));

/* ================= mask reveals (headlines) ================= */
$$('[data-mask]').forEach(el => {
  const inner = document.createElement('span');
  inner.className = 'mi';
  while (el.firstChild) inner.appendChild(el.firstChild);
  el.appendChild(inner);
});
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
$$('[data-mask],[data-reveal="rise"]').forEach(el => io.observe(el));

/* ================= nav + mobile bar ================= */
const nav = $('#nav'), mbar = $('#mbar');
function onScrollUI() {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 40);
  const past = y > innerHeight * 0.8;
  const atEnd = $('#start').getBoundingClientRect().top < innerHeight * 0.5;
  mbar.classList.toggle('show', past && !atEnd);
}

/* ================= situations ================= */
(function situations() {
  const tabs = $('#sitTabs'), panel = $('#sitPanel');
  SITUATIONS.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sit__tab'; b.setAttribute('role', 'tab');
    b.id = 'tab' + i; b.setAttribute('aria-controls', 'sitPanel');
    b.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span>${esc(s.tab)}`;
    b.addEventListener('click', () => select(i, true));
    tabs.appendChild(b);
  });
  let cur = -1;
  function select(i, user) {
    if (i === cur) return;
    cur = i;
    $$('.sit__tab', tabs).forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
    const s = SITUATIONS[i];
    panel.setAttribute('aria-labelledby', 'tab' + i);
    panel.innerHTML = `<div class="sit__idx">${String(i + 1).padStart(2, '0')} / ${SITUATIONS.length} &middot; ${esc(s.tab)}</div><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p><ul>${s.b.map(x => `<li>${esc(x)}</li>`).join('')}</ul><button class="btn btn--gold magnetic" type="button">Get my offer for this situation</button>`;
    $('button', panel).addEventListener('click', () => openFlow({ situation: s.tab }));
    if (!reduce && user) panel.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.22,1,.36,1)' });
    if (user && matchMedia('(max-width:900px)').matches) $$('.sit__tab', tabs)[i].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    bindMagnetic(panel);
  }
  tabs.addEventListener('keydown', e => {
    const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!k) return; e.preventDefault();
    const n = (cur + k + SITUATIONS.length) % SITUATIONS.length;
    select(n, true); $$('.sit__tab', tabs)[n].focus();
  });
  select(0, false);
  window.__selectSituation = select;
})();

/* ================= areas + proof ================= */
$('#areasGrid').innerHTML = CONFIG.areas.map(a => `<article class="area"><div class="area__abbr">${esc(a.abbr)}</div><h3>${esc(a.name)}</h3><p>${esc(a.detail)}</p><span class="area__type">${esc(a.type)}</span></article>`).join('');
if (CONFIG.testimonials.length) {
  $('#proof').hidden = false;
  $('#proofGrid').innerHTML = CONFIG.testimonials.map(t => `<figure><blockquote>&ldquo;${esc(t.quote)}&rdquo;</blockquote><figcaption>${esc(t.name)}${t.situation ? ' &middot; ' + esc(t.situation) : ''}</figcaption></figure>`).join('');
}

/* ================= FAQ ================= */
$$('.qa button').forEach(b => b.addEventListener('click', () => {
  const qa = b.closest('.qa'), open = !qa.classList.contains('open');
  qa.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
  if (open) track('faq_open', { question: b.textContent.trim() });
}));

/* ================= Offer flow ================= */
const CONDITIONS = ['Move-in ready', 'Needs some work', 'Needs a lot of work', 'Not sure'];
const TIMELINES = ['As soon as possible', 'In 2 to 4 weeks', 'In 1 to 2 months', 'Just exploring'];
const TOTAL = 6;
const utm = (() => { const p = new URLSearchParams(location.search), o = {}; p.forEach((v, k) => { if (/^(utm_|gclid|fbclid|msclkid)/.test(k)) o[k] = v; }); return o; })();

class Flow {
  constructor(el, opts = {}) {
    this.el = el; this.step = opts.start || 0; this.t0 = Date.now();
    this.d = { address: opts.address || '', situations: opts.situation ? [opts.situation] : [], condition: '', timeline: '', name: '', phone: '', email: '', consent: false, website: '' };
    this.el.innerHTML = `<div class="flow__top"><div class="flow__bar"><div class="flow__fill"></div></div><div class="flow__count"></div></div><div class="flow__body"></div>`;
    this.body = $('.flow__body', this.el); this.fill = $('.flow__fill', this.el); this.count = $('.flow__count', this.el);
    this.show(this.step, 1, true);
    track('offer_flow_start');
  }
  progress(n) { this.fill.style.transform = `scaleX(${Math.min(1, (n + 1) / TOTAL)})`; this.count.textContent = n < TOTAL ? `Step ${n + 1} of ${TOTAL}` : 'Complete'; }
  show(n, dir = 1, first = false) {
    this.step = n; this.progress(n);
    const html = this.tpl(n);
    this.body.innerHTML = html;
    if (!reduce && !first) this.body.animate([{ opacity: 0, transform: `translateX(${24 * dir}px)` }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
    this.bind(n);
    if (!first) { const f = $('input:not([type=checkbox]):not([type=radio]):not(.hp input), .flow__q', this.body); (f || $('.flow__q', this.body))?.focus({ preventScroll: true }); }
    track('offer_flow_step', { step: n + 1 });
  }
  nav(back) { return `<div class="flow__actions">${back ? '<button type="button" class="flow__back" data-back>Back</button>' : ''}<button type="button" class="btn btn--gold" data-next>Continue</button></div>`; }
  tpl(n) {
    const d = this.d;
    if (n === 0) return `<h3 class="flow__q" tabindex="-1">Where&rsquo;s the property?</h3><p class="flow__hint">Street address, city and state or ZIP.</p><label class="sr-only" for="f_addr">Property address</label><input class="field" id="f_addr" type="text" autocomplete="street-address" placeholder="123 Main St, City, State" value="${esc(d.address)}"><div class="flow__err" role="alert" aria-live="assertive"></div>${this.nav(false)}`;
    if (n === 1) return `<h3 class="flow__q" tabindex="-1">What&rsquo;s going on?</h3><p class="flow__hint">Pick everything that applies. It helps us tailor the offer.</p><div class="chips" role="group" aria-label="Your situation">${SITUATIONS.map((s, i) => `<label class="chip"><input type="checkbox" value="${esc(s.tab)}" ${d.situations.includes(s.tab) ? 'checked' : ''}><span>${esc(s.tab)}</span></label>`).join('')}</div><div class="flow__err" role="alert" aria-live="assertive"></div>${this.nav(true)}`;
    if (n === 2) return `<h3 class="flow__q" tabindex="-1">Roughly what shape is it in?</h3><p class="flow__hint">No wrong answer. We buy as-is.</p><div class="chips chips--one" role="radiogroup" aria-label="Condition">${CONDITIONS.map(c => `<label class="chip"><input type="radio" name="cond" value="${esc(c)}" ${d.condition === c ? 'checked' : ''}><span>${esc(c)}</span></label>`).join('')}</div><div class="flow__actions"><button type="button" class="flow__back" data-back>Back</button></div>`;
    if (n === 3) return `<h3 class="flow__q" tabindex="-1">How soon do you want to close?</h3><p class="flow__hint">You choose the date. This just helps us plan.</p><div class="chips chips--one" role="radiogroup" aria-label="Timeline">${TIMELINES.map(c => `<label class="chip"><input type="radio" name="time" value="${esc(c)}" ${d.timeline === c ? 'checked' : ''}><span>${esc(c)}</span></label>`).join('')}</div><div class="flow__actions"><button type="button" class="flow__back" data-back>Back</button></div>`;
    if (n === 4) return `<h3 class="flow__q" tabindex="-1">Where should we text your offer?</h3><p class="flow__hint">We&rsquo;ll use this to send your offer and answer questions.</p><div class="flow__fields"><div><label class="flow__lbl" for="f_name">First name</label><input class="field" id="f_name" type="text" autocomplete="given-name" value="${esc(d.name)}"></div><div><label class="flow__lbl" for="f_phone">Mobile number</label><input class="field" id="f_phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(555) 555-5555" value="${esc(d.phone)}"></div></div><div class="flow__err" role="alert" aria-live="assertive"></div>${this.nav(true)}`;
    if (n === 5) return `<h3 class="flow__q" tabindex="-1">Last thing.</h3><p class="flow__hint">Add an email if you&rsquo;d like a written copy of your offer.</p><div class="flow__fields"><div><label class="flow__lbl" for="f_email">Email (optional)</label><input class="field" id="f_email" type="email" autocomplete="email" placeholder="you@email.com" value="${esc(d.email)}"></div></div><label class="consent"><input type="checkbox" id="f_consent" ${d.consent ? 'checked' : ''}><span>Optional: I agree to receive calls and text messages from ${esc(CONFIG.legalEntity || CONFIG.brand)} at the number provided, including by automated technology, about my property. Consent is not a condition of getting an offer. Message and data rates may apply. Reply STOP to opt out. See our <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener">Terms</a>.</span></label><div class="hp" aria-hidden="true"><label>Website<input type="text" id="f_hp" tabindex="-1" autocomplete="off"></label></div><div class="flow__err" role="alert" aria-live="assertive"></div><div class="flow__actions"><button type="button" class="flow__back" data-back>Back</button><button type="button" class="btn btn--gold" data-submit>Get my cash offer</button></div>`;
    return this.doneTpl();
  }
  doneTpl() {
    const d = digits(CONFIG.phone), has = d.length >= 10, t = esc(CONFIG.offerTime);
    return `<div class="done"><svg viewBox="0 0 76 76" aria-hidden="true"><circle cx="38" cy="38" r="30"/><path d="M25 39l9 9 17-19"/></svg><h3 class="flow__q" tabindex="-1">Done. Your offer is on its way.</h3><ol><li>Your guide reviews your property details.</li><li>Your personal guide reaches out by text or call ${t}.</li><li>Your guide stays with you from here to closing. You decide, with no pressure.</li></ol>${has ? `<div class="done__btns"><a class="btn btn--dark" href="tel:+1${d.slice(-10)}">Call us</a><a class="btn btn--dark" href="sms:+1${d.slice(-10)}">Text us</a></div>` : ''}</div>`;
  }
  err(msg) { const e = $('.flow__err', this.body); if (e) e.textContent = msg; }
  bind(n) {
    const b = this.body, d = this.d;
    $('[data-back]', b)?.addEventListener('click', () => this.show(n - 1, -1));
    $('[data-next]', b)?.addEventListener('click', () => this.next(n));
    $('[data-submit]', b)?.addEventListener('click', () => this.submit());
    b.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('input[type=text],input[type=tel],input[type=email]')) { e.preventDefault(); n === 5 ? this.submit() : this.next(n); } });
    if (n === 2 || n === 3) $$('input[type=radio]', b).forEach(r => r.addEventListener('change', () => { n === 2 ? d.condition = r.value : d.timeline = r.value; setTimeout(() => this.show(n + 1, 1), 220); }));
    if (n === 4) {
      const p = $('#f_phone', b);
      p.addEventListener('input', () => { const x = digits(p.value).slice(0, 10); p.value = x.length > 6 ? `(${x.slice(0, 3)}) ${x.slice(3, 6)}-${x.slice(6)}` : x.length > 3 ? `(${x.slice(0, 3)}) ${x.slice(3)}` : x; });
    }
  }
  next(n) {
    const b = this.body, d = this.d;
    if (n === 0) { const v = $('#f_addr', b).value.trim(); if (v.length < 5) return this.err('Please enter the property address.'); d.address = v; }
    if (n === 1) { d.situations = $$('.chip input:checked', b).map(i => i.value); if (!d.situations.length) return this.err('Pick at least one. “Something else” works too.'); }
    if (n === 4) { const nm = $('#f_name', b).value.trim(), ph = $('#f_phone', b).value; if (nm.length < 2) return this.err('Please enter your first name.'); if (digits(ph).length < 10) return this.err('Please enter a 10-digit mobile number.'); d.name = nm; d.phone = ph; }
    this.show(n + 1, 1);
  }
  async submit() {
    const b = this.body, d = this.d;
    d.email = $('#f_email', b).value.trim(); d.consent = $('#f_consent', b).checked; d.website = $('#f_hp', b).value;
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return this.err('That email doesn’t look right. You can also leave it blank.');
    if (d.website || Date.now() - this.t0 < 2500) { return this.finish(true); } // bot traps
    const btn = $('[data-submit]', b); btn.disabled = true; btn.textContent = 'Sending...';
    const payload = { ...d, situations: d.situations.join(', '), sms_consent: d.consent ? 'yes' : 'no', page: location.href, referrer: document.referrer, submitted_at: new Date().toISOString(), ...utm };
    delete payload.website; delete payload.consent;
    try {
      if (CONFIG.formEndpoint) {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        if (!r.ok) throw new Error('bad status ' + r.status);
      } else { console.warn('[Pathhaven] CONFIG.formEndpoint is empty. Submission was NOT sent anywhere.', payload); }
      track('offer_flow_submit', { situations: payload.situations });
      this.finish();
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Get my cash offer';
      const p = digits(CONFIG.phone);
      this.err(p.length >= 10 ? 'Something went wrong sending that. Please try again, or call or text us directly.' : 'Something went wrong sending that. Please try again in a moment.');
    }
  }
  finish() { this.progress(TOTAL); this.show(TOTAL, 1); }
}

const modal = $('#modal');
function openFlow(opts = {}) {
  if (typeof modal.showModal !== 'function') { location.hash = '#start'; return; }
  new Flow($('#flowModal'), opts);
  modal.showModal(); root.classList.add('lock');
  track('offer_flow_open');
}
function closeModal() { modal.close(); }
modal.addEventListener('close', () => root.classList.remove('lock'));
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

$$('[data-open-flow]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  // Nav/bottom bar buttons open the modal; in-page "Ask us" links go to the inline form.
  if (a.closest('.areas__note')) { $('#start').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); return; }
  openFlow();
}));
$('#heroForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = $('#heroAddress').value.trim();
  openFlow(v.length >= 5 ? { address: v, start: 1 } : { address: v });
});
new Flow($('#flowInline'));

/* ================= magnetic buttons ================= */
function bindMagnetic(scope = document) {
  if (reduce || !matchMedia('(hover:hover)').matches) return;
  $$('.magnetic', scope).forEach(b => {
    if (b.__mag) return; b.__mag = 1;
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${((e.clientX - r.left) / r.width - .5) * 10}px,${((e.clientY - r.top) / r.height - .5) * 8}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}
bindMagnetic();

/* ================= scroll-drawn gold path ================= */
(function trail() {
  const svg = $('#trail'), path = $('#trailPath'), main = $('#main'), door = $('#door'), glow = $('.hero__glow'), hero = $('.hero');
  let len = 1, ready = false;
  function build() {
    const W = main.clientWidth, H = main.scrollHeight, mob = W < 900;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', W); svg.setAttribute('height', H);
    const top = (el) => { let y = 0, e = el; while (e && e !== main) { y += e.offsetTop; e = e.offsetParent; } return y; };
    const sec = id => { const e = $(id); return { y: top(e), h: e.offsetHeight }; };
    const L = mob ? 14 : Math.max(24, W * .035), R = W - L;
    const s = ['#situations', '#how', '#compare', '#never', '#areas', '#faq', '#start'].map(sec);
    const pts = [[L + 6, hero.offsetHeight - 40]];
    const sides = [R, L, R, L, R, L];
    s.slice(0, 6).forEach((a, i) => pts.push([sides[i], a.y + a.h * (i % 2 ? .25 : .7)]));
    let dx = W * .28, dy = s[6].y + s[6].h * .84;
    if (door && door.offsetParent) { const r = door.getBoundingClientRect(), m = main.getBoundingClientRect(); dx = r.left - m.left + r.width / 2; dy = r.bottom - m.top; }
    pts.push([dx, dy]);
    // Catmull-Rom to Bezier, vertical-biased control handles for a gentle road feel
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], k = (b[1] - a[1]) * .5;
      d += ` C${a[0]},${a[1] + k} ${b[0]},${b[1] - k} ${b[0]},${b[1]}`;
    }
    path.setAttribute('d', d);
    len = path.getTotalLength();
    path.style.strokeDasharray = len; ready = true; update();
  }
  let ticking = false;
  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    onScrollUI();
    if (ready) {
      const mt = main.getBoundingClientRect().top + y, start = hero.offsetHeight * .55, end = main.scrollHeight - $('#start').offsetHeight * .15;
      const p = Math.max(0, Math.min(1, (y + vh * .72 - mt - start) / (end - start)));
      path.style.strokeDashoffset = len * (1 - p);
    }
    if (!reduce && glow && y < vh * 1.4) glow.style.translate = `0 ${y * -.08}px`;
    if (door) { const r = $('#start').getBoundingClientRect(), t = Math.max(0, Math.min(1, (vh * .85 - r.top) / (vh * .7))); door.style.setProperty('--door', t.toFixed(3)); }
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  let rt; const rb = () => { clearTimeout(rt); rt = setTimeout(build, 150); };
  addEventListener('resize', rb);
  if ('ResizeObserver' in window) new ResizeObserver(rb).observe(main);
  document.fonts?.ready.then(build);
  addEventListener('load', build);
  build();
})();
