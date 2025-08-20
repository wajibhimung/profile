## Wibowo Laksono — Profil & Blog (PWA)

A simple, fast, and installable personal profile + blog reader built for GitHub Pages. It aggregates a profile (link hub) and a modern blog experience sourced from Blogger, complete with offline support and a clean UI.

## What is this?
- Name: Wibowo Laksono — Profil & Blog
- Purpose: Central place to share profile links and read blog posts comfortably in one app.
- Live URL: https://me.kelastkj.online/

## Highlights
- Clean two-tab layout: Profil and Blog (swipeable on mobile).
- Dark/Light mode toggle (default: Dark), with meta theme-color sync.
- Blog features:
	- Infinite scroll list from Blogger via JSONP.
	- Label filters and search (server-side q + client filter).
	- Saved posts for offline reading with a simple icon toggle.
	- “Tersimpan” badge on article and a Saved-only view in the list.
	- Reading progress bar on article page.
	- Related posts (latest) with background refresh.
- PWA:
	- Installable manifest, app shortcuts, and service worker caching.
	- Works offline with an offline page fallback.
	- Update toast when a new version is available.

## Files
- `index.html` — Profile and Blog UI (Swiper, search, labels, saved, URL sync).
- `post.html` — Article reader (progress bar, saved badge, icon save toggle, related posts).
- `manifest.json` — PWA manifest (name, icons, shortcuts).
- `sw.js` — Service Worker (precaching, runtime caching, offline, messages).
- `offline.html` — Shown when offline navigation fails.
- `profile.png` — Social/OG image.
- `CNAME` — Custom domain for GitHub Pages.

## How to use
1. Open `index.html` in a browser or deploy to GitHub Pages root.
2. Swipe or tap to switch between Profil and Blog.
3. Use search or label chips to filter articles.
4. Save an article:
	 - In list: tap “Simpan” on a card.
	 - In article: tap the 💾 icon; it turns ✔️ when saved.
5. Install the PWA from the browser’s menu (Add to Home Screen / Install app).

## Offline behavior
- Saved posts store a local snapshot and are cached by the service worker.
- `post.html` will render saved snapshots when offline.
- `index.html` has a Saved-only view that renders instantly from local data.

## Development notes
- Tailwind via CDN, darkMode='class'.
- Blogger feeds are consumed via JSONP to avoid CORS issues.
- State is persisted in `localStorage` (theme, saved) and `sessionStorage` (post/related cache).
- URL parameters for state: `?view=blog`, `label=...`, `q=...`, `saved=1`.

## Deployment (GitHub Pages)
1. Place these files at repository root on the `main` branch.
2. Ensure `CNAME` (if using a custom domain) matches your DNS.
3. Enable Pages: Settings → Pages → Build and deployment: Deploy from branch → `main` / root.

## Credits
- Design and code: Wibowo Laksono with assistance.
- Blog content: Blogger (wajibhimung.blogspot.com).

## License
This project is provided as-is for personal use. Adjust and reuse responsibly.
