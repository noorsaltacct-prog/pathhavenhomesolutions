# Pathhaven Home Solutions website

Static site. No build step, no dependencies. Vanilla HTML/CSS/JS.

## MUST DO BEFORE LAUNCH
1. **Form endpoint** (otherwise leads go nowhere): open `assets/js/main.js`, set `CONFIG.formEndpoint`.
   Easiest: create a free form at formspree.io or web3forms.com and paste the URL. Submit a test lead.
2. **Contact info** in the same CONFIG block: `phone`, `email`, `hours`, `legalEntity`.
   Leaving phone empty hides every Call/Text button automatically.
3. **Domain**: find and replace `YOUR-DOMAIN.com` in `index.html`, `robots.txt`, `sitemap.xml`.
4. **Legal pages**: `privacy.html` and `terms.html` are templates. Replace every `[BRACKETED]` item and have an attorney review them for each state you operate in. Wholesaling rules differ by state. Add anything required in `CONFIG.stateDisclosure`.
5. **Confirm promises**: "offer within 24 hours" (`CONFIG.offerTime`), "no fees", "no repairs". Only keep what you will actually deliver.
6. **Real proof**: add real testimonials to `CONFIG.testimonials`. The section stays hidden until you do.

## Deploy: GitHub then Vercel
1. Create a GitHub repo, upload the CONTENTS of this folder (index.html must be at the repo root).
2. vercel.com > Add New Project > import the repo.
3. Framework Preset: **Other**. Build Command: empty. Output Directory: leave default (root). Deploy.
4. Project Settings > Domains > add your domain.

## Edit
- Situations copy: `SITUATIONS` array in `assets/js/main.js`.
- States/areas: `CONFIG.areas`.
- Colors: CSS variables at the top of `assets/css/main.css`.
- Tracking: the site pushes events to `window.dataLayer` (offer_flow_open, offer_flow_step, offer_flow_submit). Add GA4 / Meta pixel later via Google Tag Manager.
