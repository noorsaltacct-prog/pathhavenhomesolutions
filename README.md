# Pathhaven Home Solutions website

Static site. No build step, no dependencies. Vanilla HTML/CSS/JS.

## MUST DO BEFORE LAUNCH
1. **Lead alerts (free)**: form posts to `/api/lead` (`api/lead.js`). In Vercel > Project > Settings > Environment Variables add:
   - `NTFY_TOPIC` = a long random secret string. Install the free ntfy app, subscribe to that topic, allow notifications -> instant phone alert on every lead.
   - `RESEND_API_KEY` (free at resend.com, sign up with pathhavenhomesolutions@gmail.com) -> emails that address.
   - Optional paid SMS: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`.
   Redeploy, submit a test lead.
2. **Contact info** is set in `CONFIG` (`assets/js/main.js`). Still blank: `hours`, `legalEntity`.
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
