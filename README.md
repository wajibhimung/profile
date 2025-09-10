## Wibowo Laksono — Profil & Blog (PWA)

Profil + pembaca blog ringkas, cepat, bisa di-install (PWA). Menggabungkan hub tautan dan pengalaman membaca artikel Blogger secara modern dengan dukungan offline & fitur simpan.

Live: https://me.kelastkj.online/

## Fitur Utama
Profil & Navigasi
- Dua slide (Profil ↔ Blog) dengan Swiper (swipe mobile / klik indikator / tombol tab bawah)
- Mode gelap/terang (default: gelap) + sinkron meta theme-color
- Long‑press (tahan ±0.32 dtk) pada foto profil: perbesar dengan backdrop blur + tombol Bagikan & Salin Link (klik kanan tetap aktif)

Blog
- Infinite scroll JSONP feed Blogger (tanpa backend, hindari CORS)
- Pencarian (server-side q + filter klien) & filter label dinamis
- Simpan artikel (offline snapshot + daftar “Tersimpan” / chip khusus)
- Mode “Tersimpan” bekerja penuh walau offline
- Tombol simpan di kartu & halaman artikel
- Pembaca artikel (`post.html`) dengan progress bar & (di kode) dukungan memuat konten tersimpan

PWA & Offline
- Service Worker: precache aset inti + runtime caching Blogger feeds & gambar
- Pemutakhiran SW menampilkan toast “Versi baru siap”
- Offline fallback (`offline.html`) diberi meta `noindex` (dikeluarkan dari sitemap)
- Saved posts dimuat dari `localStorage` + cache JS

SEO & Indexing
- Meta tags disempurnakan (title konsisten, description ringkas)
- Structured Data: `Person` + `WebSite` (SearchAction untuk pencarian internal parameter `q`)
- `robots.txt` mengizinkan crawl root dan memblok variasi parameter (`?q=`, `?label=`, `?view=`) agar tidak jadi duplikat indeks
- `sitemap.xml` hanya memuat URL relevan (tidak termasuk offline.html)
- Gambar profil kini sumber lokal: `foto.jpeg` (lebih cepat, kontrol penuh)

## Struktur Berkas
- `index.html`  : UI profil + blog (Swiper, filter, saved, long‑press viewer, theme)
- `post.html`   : Pembaca artikel individual & progress bar
- `sw.js`       : Service Worker (precache, stale-while-revalidate, pesan CACHE_POSTS)
- `manifest.json`: Manifest PWA (shortcuts Profil & Blog)
- `offline.html`: Halaman offline (noindex)
- `robots.txt`  : Aturan crawl + link sitemap
- `sitemap.xml` : Peta situs sederhana
- `foto.jpeg`   : Foto profil lokal (juga dipakai favicon & apple-touch-icon)
- `profile.png` : Gambar OG/social (bisa diganti ke foto.jpeg jika mau konsisten)
- `CNAME`       : Domain kustom Pages

## Cara Pakai Cepat
1. Buka `index.html` (lokal atau via Pages).  
2. Geser / klik ke tab Blog untuk memuat feed pertama.  
3. Simpan artikel → ikon bookmark (berubah warna hijau).  
4. Tahan foto profil sebentar untuk viewer & tombol share.  
5. Tambah ke layar utama (A2HS) jika prompt tersedia.  

## Simpan & Offline
- Tiap artikel disimpan menyimpan snapshot dasar (judul, ringkas, tanggal, label) di `localStorage`.
- SW diminta meng-cache JSONP detail melalui pesan `CACHE_POSTS`.
- Mode “Tersimpan” tidak memicu fetch baru sehingga cepat & aman offline.

## Parameter URL (State)
`?view=blog` | `q=kata` | `label=NamaLabel` | `saved=1`  
Semua dibersihkan oleh `robots.txt` untuk menghindari indeks varian.

## Konfigurasi & Kustomisasi
Hold duration long‑press: di `index.html` (fungsi `setupPhotoViewer`) konstanta `HOLD=320` ms.  
Threshold gerak batal: `MOVE_CANCEL=18` px.  
Ganti OG image: edit `<meta property="og:image">` di `<head>`.  
Tambahkan verifikasi Google Search Console: sisipkan meta `google-site-verification` sebelum script lain di `<head>`.

## Google Search Console (Ringkas)
1. Gunakan properti tipe Domain untuk `kelastkj.online` (cakup semua subdomain).  
2. Submit `https://me.kelastkj.online/sitemap.xml`.  
3. Inspect `https://me.kelastkj.online/` → Request Indexing.  
4. Pantau “Page Indexing” & perbaiki jika ada soft 404 (cukup jaga deskripsi profil tetap informatif).  

## Pengembangan
- Tailwind CDN (konfigurasi `darkMode:'class'` sebelum load)
- Tidak ada build step: semua HTML/JS statis
- JSONP Blogger: penambahan callback dinamis → insert `<script>` kemudian cleanup
- Penyimpanan: `localStorage` (theme, saved), `sessionStorage` (flag init SW, dsb)
- Komunikasi SW: `postMessage({ type:'CACHE_POSTS', urls:[...] })`

## Deployment (GitHub Pages)
1. Push ke branch `main` (root).  
2. Pastikan DNS domain mengarah ke GitHub Pages & file `CNAME` sesuai.  
3. Aktifkan Pages di Settings → Pages.  
4. Setelah live, cek `robots.txt` & `sitemap.xml` langsung via browser.

## Catatan Keamanan
- Tidak menyimpan data sensitif; hanya metadata artikel dan preferensi lokal.  
- Pastikan gambar lokal (foto.jpeg) ukuran wajar untuk mengurangi TTFB & LCP.  
- Jika menambah script eksternal baru, pertimbangkan `integrity` & `referrerpolicy`.

## Rencana Peningkatan (Opsional)
- Preload gambar profil (`<link rel="preload" as="image">`)
- Ganti OG image ke `foto.jpeg` agar konsisten identitas
- Tambah dukungan share langsung ke WhatsApp/Telegram di overlay viewer
- Kompres service worker cache manajemen (limit size / LRU)

## Lisensi
Disediakan apa adanya untuk penggunaan pribadi/edu. Boleh modifikasi dengan atribusi.

---
Ringkas: repositori ini kini mencakup optimasi SEO (schema, robots, sitemap), viewer foto interaktif, dan penyesuaian gambar lokal tanpa mengubah struktur UI dasar.
