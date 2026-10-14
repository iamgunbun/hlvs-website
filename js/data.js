/* =========================================================================
   SITE CONTENT — edit this file to update the website.
   Everything below is placeholder content. Replace it with the real thing.
   ========================================================================= */

const SITE = {
  band: "Hasta La Victoria Siempre",
  short: "HLVS",
  tagline: "Technical Death Metal", // not shown on the site; only tells search engines the genre
  location: "Dallas, TX",
  // Your real web address, no trailing slash. Also update it in sitemap.xml,
  // robots.txt and the <head> of each .html page (search for "example.com").
  url: "https://example.com",
  bookingEmail: "booking@example.com",
  generalEmail: "contact@example.com",

  // Songwriting credit shown on every release unless a release sets its own.
  writer: "Mark Marquez",

  // Leave a link as "" to hide that icon.
  socials: {
    instagram: "https://www.instagram.com/hlvstx",
    youtube: "https://www.youtube.com/@hlvstx",
    spotify: "https://open.spotify.com/artist/5aoya2IpPFx4YacWS9dTbY",
    facebook: "",
    tiktok: "",
  },
};

/* --- HOME PAGE HERO -----------------------------------------------------
   The looping background video and call-to-action at the top of the home page.
   video: a short, silent clip (it plays muted). poster: still shown while it loads.
------------------------------------------------------------------------- */
const HERO = {
  eyebrow: "New single // Out now",
  title: "Intruder",
  video: "video/intruder.mp4",
  poster: "img/intruder-poster.jpg",
  buttonLabel: "Watch the video",
  buttonUrl: "https://www.youtube.com/watch?v=I4gVEAzl0Zs",
};

/* --- RELEASES ------------------------------------------------------------
   Newest first. The first entry is featured on the home page.
   cover: path to an image in /img (e.g. "img/album.jpg"), or "" for a placeholder.
   tracks: each is { title, length } — length as "m:ss", or "" if unknown.
   credits: optional. Every release credits SITE.writer for lyrics & music by default;
            only set this to override it for a specific release.
   released: optional full release date "YYYY-MM-DD"; label: optional record label.
   featuring: optional collaborating artist (e.g. "Crooked Life").
------------------------------------------------------------------------- */
const RELEASES = [
  {
    title: "Intruder",
    type: "Single",
    year: 2025,
    released: "2025-09-25",
    cover: "img/intruder-cover.jpg",
    description: "Released September 25, 2025.",
    tracks: [{ title: "Intruder", length: "3:02" }],
    links: {
      // Swap in the single's own Spotify link (Share → Copy link to album) to send people straight to it.
      spotify: "https://open.spotify.com/artist/5aoya2IpPFx4YacWS9dTbY",
      apple: "",
      youtube: "https://www.youtube.com/watch?v=I4gVEAzl0Zs",
    },
  },
  {
    title: "Only You Can Start Forest Fires",
    type: "Single",
    year: 2025,
    // Stand-in cover made from the YouTube thumbnail; replace with the real artwork when available.
    cover: "img/forest-fires-cover.jpg",
    description: "Released 2025.",
    tracks: [{ title: "Only You Can Start Forest Fires", length: "" }],
    links: {
      spotify: "https://open.spotify.com/artist/5aoya2IpPFx4YacWS9dTbY",
      apple: "",
      youtube: "https://www.youtube.com/watch?v=hBfTJLgeTLY",
    },
  },
  {
    title: "The Logic Plague",
    type: "EP",
    year: 2024,
    cover: "img/the-logic-plague.jpg",
    description: "Three tracks, 9 minutes 28 seconds.",
    tracks: [
      { title: "Born Asunder", length: "3:09" },
      { title: "That's Not A Knife (This Is A Knife)", length: "3:11" },
      { title: "The Logic Plague", length: "3:07" },
    ],
    links: {
      // Swap in the EP's own Spotify link (Share → Copy link to album) to send people straight to it.
      spotify: "https://open.spotify.com/artist/5aoya2IpPFx4YacWS9dTbY",
      apple: "",
      youtube: "",
    },
  },
  {
    title: "West Texas",
    type: "Single",
    year: 2022,
    released: "2022-12-01",
    featuring: "Crooked Life",
    cover: "img/west-texas-cover.jpg",
    description: "HLVS x Crooked Life. Released December 1, 2022.",
    tracks: [{ title: "West Texas", length: "" }],
    links: {
      spotify: "https://open.spotify.com/artist/5aoya2IpPFx4YacWS9dTbY",
      apple: "",
      youtube: "",
    },
  },
];

/* --- SHOWS ---------------------------------------------------------------
   Dates as "YYYY-MM-DD". Past dates hide themselves automatically.
   status: "" | "soldout" | "cancelled"
------------------------------------------------------------------------- */
// No shows yet: the site shows a "TBA" placeholder while this list is empty.
// To add one, copy the example line below (without the //) inside the brackets.
// { date: "2026-11-07", city: "City, ST", venue: "Venue Name", with: "w/ Other Band", tickets: "https://...", status: "" },
const SHOWS = [];

/* --- VIDEOS --------------------------------------------------------------
   youtubeId: the part after "watch?v=" in a YouTube link.
   e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
   The first entry is featured at the top of the Videos page.
   The home page shows one at random each time it loads.
   year: leave as "" if unknown.
------------------------------------------------------------------------- */
const VIDEOS = [
  { title: "Intruder (Official Music Video)", youtubeId: "I4gVEAzl0Zs", category: "Music Video", year: 2025 },
  { title: "That's Not A Knife (This Is A Knife) (Official Music Video)", youtubeId: "WpUzIrVb6yc", category: "Music Video", year: 2024 },
  { title: "The Logic Plague (Official Visualizer)", youtubeId: "NkGKJQRr7gw", category: "Music Video", year: 2024 },
  { title: "Only You Can Start Forest Fires (Official Visualizer)", youtubeId: "hBfTJLgeTLY", category: "Music Video", year: 2025 },
];

/* --- MERCH ---------------------------------------------------------------
   image: path in /img, or "" for a placeholder.
   url: link to buy that item, or "" if it is not sold online.
------------------------------------------------------------------------- */
const MERCH_STORE_URL = ""; // link to your online store, or "" to hide the button

// No merch listed yet: the Merch page shows a "coming soon" message while this is empty.
// To add an item, copy the example below (without the //) inside the brackets.
// { name: "Logo Tee", price: "$25", image: "img/logo-tee.jpg", url: "" },
const MERCH = [];
