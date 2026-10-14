# Hasta La Victoria Siempre: website

A plain HTML/CSS/JS band site. There's no build step, so you can open `index.html` in a browser or upload the folder to any static host.

## Updating content

**Edit `js/data.js`.** It holds all the site content:

| What | Where in `data.js` |
|---|---|
| Band name, emails, social links | `SITE` |
| Home page video, headline and button | `HERO` |
| Albums / EPs, tracklists, streaming links | `RELEASES` (newest first; the first one is featured on the home page) |
| Shows | `SHOWS` (`YYYY-MM-DD`; past dates hide automatically) |
| Videos | `VIDEOS` (paste the YouTube ID, the part after `watch?v=`) |
| Merch | `MERCH` and `MERCH_STORE_URL` |

## Images

Put images in `img/`:

- `img/logo.png`: the white logo used in the header and footer. `img/logo-source.png` is your original black-on-white version.
- `video/intruder.mp4`: the looping home-page video. To promote a new single, drop in a new clip and update `HERO` in `data.js`.
- `img/og-image.jpg`: the image shown when someone shares a link to the site.
- Album covers: set `cover: "img/your-cover.jpg"` on a release.
- Merch photos: set `image: "img/shirt.jpg"` on a merch item.

## Colors and fonts

Change the variables at the top of `css/style.css` (`--accent` is the ocean blue).

## Pages

`index.html` (home) · `music.html` · `tour.html` (Shows) · `videos.html` · `merch.html` · `contact.html`

## SEO

Already built in:

- A unique title and description on every page.
- Link previews for sharing (Open Graph and Twitter cards).
- Canonical URLs.
- A crawlable nav menu.
- `sitemap.xml` and `robots.txt`.
- Structured data (schema.org JSON-LD) generated from `data.js`. It marks you as a `MusicGroup`, each show as a `MusicEvent` and each release as a `MusicAlbum`.

Still to do:

1. **Set your domain.** Replace `https://example.com` in every `.html` file, `sitemap.xml`, `robots.txt` and `SITE.url` in `data.js`.
2. **Google Search Console:** add the site, verify it, and submit `sitemap.xml`. Do the same in Bing Webmaster Tools.
3. **Link back from everywhere.** Put the site URL in your Instagram, YouTube, Spotify for Artists and Facebook bios. Inbound links from your own profiles are the biggest ranking signal a band site gets.
4. **Keep the name identical everywhere:** "Hasta La Victoria Siempre". It helps Google connect your profiles into one knowledge panel.
5. **Test** with Google's Rich Results Test (search.google.com/test/rich-results) once the site is live.

## Hosting

Drag the folder into Netlify Drop, or push it to GitHub Pages or Vercel. There's no build command.
