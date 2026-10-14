/* Renders shared header/footer and fills each page from js/data.js. */

const ICONS = {
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z"/></svg>',
  spotify:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 9.5c3.5-1 7.5-.6 10.3 1M7.6 12.6c2.9-.8 6-.4 8.4 1M8.2 15.5c2.2-.6 4.5-.3 6.3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8h3V4h-3c-2.8 0-4.5 1.9-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V9c0-.6.4-1 1-1Z"/></svg>',
  tiktok:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.5 2h-3.6v13.6a3 3 0 1 1-3-3c.3 0 .6 0 .9.1V9a6.6 6.6 0 1 0 5.7 6.6V8.8a8 8 0 0 0 4.5 1.4V6.6a4.6 4.6 0 0 1-4.5-4.6Z"/></svg>',
  apple:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18 3v12.5a3 3 0 1 1-2-2.8V7.3l-7 1.5v8.7a3 3 0 1 1-2-2.8V5.6L18 3Z"/></svg>',
};

const $ = (sel, root = document) => root.querySelector(sel);

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function socialLinks(cls = "socials") {
  const items = Object.entries(SITE.socials)
    .filter(([, url]) => url)
    .map(
      ([name, url]) =>
        `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${name}" title="${name}">${ICONS[name] || name}</a>`
    )
    .join("");
  return `<div class="${cls}">${items}</div>`;
}

/* ---------- Header & footer ---------- */
// The header markup lives in each HTML file so search engines can follow the nav links.
function renderChrome() {
  const header = $("#site-header");
  if (header) {
    const toggle = $(".nav-toggle", header);
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="wrap footer-inner">
        <div>
          <img class="footer-logo" src="img/logo.png" alt="${esc(SITE.band)}" width="1189" height="276" loading="lazy">
          <div class="muted mono">${esc(SITE.location)}</div>
        </div>
        ${socialLinks()}
        <div class="muted mono small">&copy; ${new Date().getFullYear()} ${esc(SITE.band)}</div>
      </div>`;
  }
}

/* ---------- Shared pieces ---------- */
function coverArt(r) {
  return r.cover
    ? `<img src="${esc(r.cover)}" alt="${esc(r.title)} cover art" loading="lazy">`
    : `<div class="placeholder-art"><span>${esc(r.title)}</span></div>`;
}

function releaseLinks(links) {
  const labels = { spotify: "Spotify", apple: "Apple Music", youtube: "YouTube" };
  return Object.entries(links || {})
    .filter(([, url]) => url)
    .map(([k, url]) => `<a class="btn btn-small" href="${esc(url)}" target="_blank" rel="noopener">${labels[k] || k}</a>`)
    .join("");
}

function releaseCredits(r) {
  return r.credits || `Lyrics & music by ${SITE.writer}`;
}

function tracklist(r) {
  const rows = r.tracks
    .map((t) => `<li><span>${esc(t.title)}</span><span class="track-len">${esc(t.length || "")}</span></li>`)
    .join("");
  return `<ol class="tracklist mono">${rows}</ol><p class="credits mono">${esc(releaseCredits(r))}</p>`;
}

function upcomingShows() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return SHOWS.filter((s) => new Date(s.date + "T00:00:00") >= today).sort((a, b) => a.date.localeCompare(b.date));
}

function showRow(s) {
  const d = new Date(s.date + "T00:00:00");
  const mon = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(d.getDate()).padStart(2, "0");
  const dow = d.toLocaleString("en-US", { weekday: "short" }).toUpperCase();
  let action;
  if (s.status === "soldout") action = `<span class="tag tag-out">Sold out</span>`;
  else if (s.status === "cancelled") action = `<span class="tag tag-out">Cancelled</span>`;
  else if (s.tickets) action = `<a class="btn btn-small btn-accent" href="${esc(s.tickets)}" target="_blank" rel="noopener">Tickets</a>`;
  else action = `<span class="tag">TBA</span>`;
  return `
    <li class="show${s.status ? " show-" + s.status : ""}">
      <div class="show-date"><span class="mon">${mon}</span><span class="day">${day}</span><span class="dow">${dow}</span></div>
      <div class="show-info">
        <div class="show-city">${esc(s.city)}</div>
        <div class="show-venue">${esc(s.venue)}${s.with ? ` <span class="muted">// ${esc(s.with)}</span>` : ""}</div>
      </div>
      <div class="show-action">${action}</div>
    </li>`;
}

function showList(shows) {
  if (!shows.length) {
    return `
      <ul class="shows">
        <li class="show show-tba">
          <div class="show-date"><span class="day">TBA</span></div>
          <div class="show-info">
            <div class="show-city">New dates to be announced</div>
            <div class="show-venue">Follow us to hear first.</div>
          </div>
          <div class="show-action">${socialLinks()}</div>
        </li>
      </ul>`;
  }
  return `<ul class="shows">${shows.map(showRow).join("")}</ul>`;
}

function videoCard(v, featured = false) {
  const thumb = v.youtubeId
    ? `<img src="https://i.ytimg.com/vi/${esc(v.youtubeId)}/hqdefault.jpg" alt="" loading="lazy">`
    : `<div class="placeholder-art"><span>Video coming soon</span></div>`;
  return `
    <figure class="video${featured ? " video-featured" : ""}" data-id="${esc(v.youtubeId)}">
      <button class="video-frame" ${v.youtubeId ? "" : "disabled"} aria-label="Play ${esc(v.title)}">
        ${thumb}
        ${v.youtubeId ? '<span class="play" aria-hidden="true"></span>' : ""}
      </button>
      <figcaption>
        <span class="video-title">${esc(v.title)}</span>
        <span class="muted mono small">${esc(v.category)}${v.year ? ` // ${esc(v.year)}` : ""}</span>
      </figcaption>
    </figure>`;
}

// Click-to-load: swaps the thumbnail for the real YouTube player so pages stay fast.
function bindVideos(root = document) {
  root.querySelectorAll(".video-frame:not([disabled])").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.closest(".video").dataset.id;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      iframe.title = "YouTube video player";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      const wrap = document.createElement("div");
      wrap.className = "video-frame";
      wrap.appendChild(iframe);
      btn.replaceWith(wrap);
    });
  });
}

/* ---------- Page renderers ---------- */
const PAGES = {
  home() {
    $("#hero-eyebrow").textContent = HERO.eyebrow;
    $("#hero-title").textContent = HERO.title;
    $("#hero-tagline").textContent = SITE.band;
    $("#hero-cta").href = HERO.buttonUrl;
    $("#hero-cta-label").textContent = HERO.buttonLabel;
    $("#hero-socials").innerHTML = socialLinks();

    const video = $("#hero-video");
    if (video.getAttribute("src") !== HERO.video) video.src = HERO.video;
    video.poster = HERO.poster;
    // Respect "reduce motion": show the still poster instead of the moving video.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }

    const r = RELEASES[0];
    if (r) {
      $("#latest-release").innerHTML = `
        <div class="release-feature">
          <div class="cover">${coverArt(r)}</div>
          <div>
            <p class="eyebrow">${esc(r.type)} // ${esc(r.year)}</p>
            <h3 class="release-title">${esc(r.title)}</h3>
            <p>${esc(r.description)}</p>
            ${tracklist(r)}
            <div class="btn-row">${releaseLinks(r.links)}</div>
          </div>
        </div>`;
    }

    $("#home-shows").innerHTML = showList(upcomingShows().slice(0, 4));

    // A different video each visit, picked from the ones that have a YouTube link.
    const playable = VIDEOS.filter((v) => v.youtubeId);
    if (playable.length) {
      const pick = playable[Math.floor(Math.random() * playable.length)];
      $("#home-video").innerHTML = videoCard(pick, true);
      bindVideos($("#home-video"));
    }
  },

  music() {
    $("#releases").innerHTML = RELEASES.map(
      (r, i) => `
      <article class="release" id="release-${i}">
        <div class="cover">${coverArt(r)}</div>
        <div class="release-body">
          <p class="eyebrow">${esc(r.type)} // ${esc(r.year)}</p>
          <h2 class="release-title">${esc(r.title)}</h2>
          <p>${esc(r.description)}</p>
          ${tracklist(r)}
          <div class="btn-row">${releaseLinks(r.links)}</div>
        </div>
      </article>`
    ).join("");
  },

  tour() {
    $("#all-shows").innerHTML = showList(upcomingShows());
    $("#booking-link").href = `mailto:${SITE.bookingEmail}`;
    $("#booking-link").textContent = SITE.bookingEmail;
  },

  videos() {
    const cats = ["All", ...new Set(VIDEOS.map((v) => v.category))];
    const filters = $("#video-filters");
    filters.innerHTML = cats
      .map((c, i) => `<button class="chip" data-cat="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`)
      .join("");
    // Filters are pointless with only one kind of video.
    filters.hidden = cats.length <= 2;

    const [featured, ...rest] = VIDEOS;
    $("#featured-video").innerHTML = featured ? videoCard(featured, true) : "";
    bindVideos($("#featured-video"));

    const grid = $("#video-grid");
    const draw = (cat) => {
      const list = cat === "All" ? rest : VIDEOS.filter((v) => v.category === cat);
      grid.innerHTML = list.length ? list.map((v) => videoCard(v)).join("") : `<p class="empty mono">Nothing here yet.</p>`;
      bindVideos(grid);
    };
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      filters.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", b === btn));
      $("#featured-video").hidden = btn.dataset.cat !== "All";
      draw(btn.dataset.cat);
    });
    draw("All");
  },

  merch() {
    if (!MERCH.length) {
      const grid = $("#merch-grid");
      grid.classList.remove("merch-grid");
      grid.innerHTML = `
        <ul class="shows">
          <li class="show show-tba">
            <div class="show-date"><span class="day">TBA</span></div>
            <div class="show-info">
              <div class="show-city">Merch coming soon</div>
              <div class="show-venue">Follow us to hear first.</div>
            </div>
            <div class="show-action">${socialLinks()}</div>
          </li>
        </ul>`;
      const store = $("#store-link");
      if (store) store.parentElement.remove();
      return;
    }

    $("#merch-grid").innerHTML = MERCH.map((m) => {
      const inner = `
        <div class="merch-img">${
          m.image ? `<img src="${esc(m.image)}" alt="${esc(m.name)}" loading="lazy">` : `<div class="placeholder-art"><span>${esc(SITE.short)}</span></div>`
        }</div>
        <div class="merch-meta"><span>${esc(m.name)}</span><span class="price mono">${esc(m.price)}</span></div>`;
      // Items without a link are shown but not clickable (e.g. sold at shows only).
      return m.url
        ? `<a class="merch-item" href="${esc(m.url)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="merch-item">${inner}</div>`;
    }).join("");

    const store = $("#store-link");
    if (MERCH_STORE_URL) store.href = MERCH_STORE_URL;
    else store.parentElement.remove();
  },

  contact() {
    $("#booking-email").href = `mailto:${SITE.bookingEmail}`;
    $("#booking-email").textContent = SITE.bookingEmail;
    $("#general-email").href = `mailto:${SITE.generalEmail}`;
    $("#general-email").textContent = SITE.generalEmail;
    $("#contact-socials").innerHTML = socialLinks("socials socials-large");

    // No backend: the form opens the visitor's email app with the message filled in.
    $("#contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const to = f.topic.value === "Booking" ? SITE.bookingEmail : SITE.generalEmail;
      const subject = `[${f.topic.value}] from ${f.name.value}`;
      const body = `${f.message.value}\n\n— ${f.name.value} (${f.email.value})`;
      location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  },
};

/* ---------- Structured data (schema.org JSON-LD) ----------
   Tells Google this is a band, and lists shows and releases so they can
   appear as rich results. Built from data.js so it never goes out of date. */
function absUrl(p) {
  return p ? new URL(p, SITE.url + "/").href : undefined;
}

function bandSchema() {
  return {
    "@type": "MusicGroup",
    name: SITE.band,
    alternateName: SITE.short,
    genre: SITE.tagline,
    url: SITE.url,
    logo: absUrl("img/logo-source.png"),
    sameAs: Object.values(SITE.socials).filter(Boolean),
    location: { "@type": "Place", name: SITE.location, address: SITE.location },
  };
}

function eventSchema(s) {
  const status = { soldout: "EventScheduled", cancelled: "EventCancelled" }[s.status] || "EventScheduled";
  const event = {
    "@type": "MusicEvent",
    name: `${SITE.band} at ${s.venue}`,
    startDate: s.date,
    eventStatus: `https://schema.org/${status}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: s.venue, address: s.city },
    performer: { "@type": "MusicGroup", name: SITE.band, url: SITE.url },
    organizer: { "@type": "Organization", name: s.venue },
    image: absUrl("img/og-image.jpg"),
    description: s.with ? `${SITE.band} ${s.with}` : `${SITE.band} live in ${s.city}`,
  };
  if (s.tickets) {
    event.offers = {
      "@type": "Offer",
      url: s.tickets,
      availability: `https://schema.org/${s.status === "soldout" ? "SoldOut" : "InStock"}`,
      validFrom: new Date().toISOString().slice(0, 10),
    };
  }
  return event;
}

function albumSchema(r) {
  const band = { "@type": "MusicGroup", name: SITE.band };
  const artists = r.featuring ? [band, { "@type": "MusicGroup", name: r.featuring }] : band;
  return {
    "@type": "MusicAlbum",
    name: r.title,
    datePublished: r.released || String(r.year),
    albumReleaseType: { Single: "https://schema.org/SingleRelease", EP: "https://schema.org/EPRelease" }[r.type] || "https://schema.org/AlbumRelease",
    recordLabel: r.label ? { "@type": "Organization", name: r.label } : undefined,
    image: absUrl(r.cover),
    byArtist: artists,
    numTracks: r.tracks.length,
    track: r.tracks.map((t, i) => {
      const rec = { "@type": "MusicRecording", name: t.title, position: i + 1, byArtist: artists };
      // Only describe the writer when using the default credit; a custom credit is free text.
      if (!r.credits) {
        const writer = { "@type": "Person", name: SITE.writer };
        rec.recordingOf = { "@type": "MusicComposition", name: t.title, composer: writer, lyricist: writer };
      }
      const [m, s] = (t.length || "").split(":");
      if (s) rec.duration = `PT${+m}M${+s}S`;
      return rec;
    }),
    sameAs: Object.values(r.links || {}).filter(Boolean),
  };
}

function addStructuredData(page) {
  const graph = [bandSchema()];
  if (page === "home" || page === "tour") graph.push(...upcomingShows().map(eventSchema));
  if (page === "home" || page === "music") graph.push(...RELEASES.map(albumSchema));
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  document.head.appendChild(el);
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  const page = document.body.dataset.page;
  if (PAGES[page]) PAGES[page]();
  addStructuredData(page);
});
