# Sofia Reyes

Your portfolio site, exported from PortfolioDIY as clean, dependency-free HTML/CSS/JS.
You own this code 100% — no lock-in, no runtime dependency on PortfolioDIY.

## File structure

```
index.html          — your portfolio homepage
contact.php         — contact form handler (configure your email inside)
assets/
  css/styles.css    — all styles, built from your design tokens
  js/main.js        — minimal vanilla JS (navbar, form submit, smooth scroll)
  img/              — your images (add your own here)
robots.txt          — search engine instructions
sitemap.xml         — sitemap for SEO
.htaccess           — cache, compression, security headers (Apache/cPanel)
```

## How to host this site

### Option A — GitHub Pages (free, recommended for devs)
1. Create a new repo on GitHub.
2. Push all these files to the `main` branch.
3. Go to Settings → Pages → Source: "Deploy from main branch / root".
4. Your site will be live at `https://yourusername.github.io/your-repo`.

### Option B — Netlify / Vercel (free)
1. Drag-and-drop the unzipped folder to [app.netlify.com](https://app.netlify.com) → Done.
2. Or connect your GitHub repo for auto-deploys.

### Option C — cPanel / Shared hosting (~$3/month)
1. Log into cPanel → File Manager.
2. Upload all files to the `public_html` folder (or a subdirectory).
3. Open `contact.php` and replace `YOUR_EMAIL_HERE` with your email.

## Contact form setup
Edit `contact.php`:
```php
define('RECIPIENT_EMAIL', 'you@yourdomain.com');
```
The form uses PHP `mail()` — works on most shared hosts out of the box.
For better deliverability (Gmail etc.), configure your host's SMTP or use a service like SendGrid / Mailgun.

_Made with [PortfolioDIY](https://portfoliodiy.com) — the portfolio builder whose code a senior engineer would be proud to ship._
