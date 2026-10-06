export type GalleryKey = "aiden" | "drakk" | "gioh";

export type BWEvent = {
  id: string;
  /** Full event name as listed on Shotgun */
  title: string;
  /** Short headline used in big type, e.g. "Dax J + Laure Croft" */
  headline: string;
  lineup: string[];
  /** ISO date (YYYY-MM-DD), local Atlanta date of the night */
  date: string;
  hours?: string;
  venue: string;
  tags: string[];
  flyerSrc: string;
  ticketsHref: string;
  /** Photo set on the Gallery page */
  gallery?: GalleryKey;
  /** Recap video in /public/promos */
  promoSrc?: string;
};

export const SHOTGUN_PAGE = "https://shotgun.live/en/venues/brainwash";

const shotgunEvent = (slug: string) => `https://shotgun.live/en/events/${slug}`;
const shotgunFlyer = (id: string) =>
  `https://res.cloudinary.com/shotgun/image/upload/c_limit,w_1400/f_auto/q_auto/production/artworks/${id}`;

// Newest first. Upcoming vs past is worked out from the date, so a show
// moves to "past" by itself the day after it happens.
export const events: BWEvent[] = [
  {
    id: "daxj",
    title: "Brainwash Presents: Dax J, Laure Croft",
    headline: "Dax J + Laure Croft",
    lineup: ["Dax J", "Laure Croft", "GNVR", "Mark Mohr"],
    date: "2026-11-07",
    hours: "9PM–3AM",
    venue: "Secret location, Atlanta",
    tags: ["Techno", "Hypnotic Techno", "Detroit Techno"],
    flyerSrc: shotgunFlyer("IMG_7469_b0hyo9.jpg"),
    ticketsHref: shotgunEvent("brainwash-presents-dax-j"),
  },
  {
    id: "obi-perpleks",
    title: "Brainwash Presents: O.B.I., Per Pleks",
    headline: "O.B.I. + Per Pleks",
    lineup: ["O.B.I.", "Per Pleks"],
    date: "2026-09-25",
    hours: "10PM–4AM",
    venue: "Secret location, Atlanta",
    tags: ["German Techno", "Hard Techno", "Techno"],
    flyerSrc: shotgunFlyer("obiperpleks169_kczk2e.png"),
    ticketsHref: shotgunEvent("brainwash-presents-o-b-i-per-pleks"),
  },
  {
    id: "lars-huismann",
    title: "Brainwash Presents: Lars Huismann, Lindsey Herbert",
    headline: "Lars Huismann + Lindsey Herbert",
    lineup: ["Lars Huismann", "Lindsey Herbert", "GNVR", "Iñaki"],
    date: "2026-08-01",
    venue: "Underground Atlanta",
    tags: ["Hard Groove", "Techno"],
    flyerSrc: shotgunFlyer("ChatGPT_Image_Jun_30_2026_at_02_34_32_PM_k25dya.png"),
    ticketsHref: shotgunEvent("brainwash-presents-lars-huismann-lindsey-herbert"),
  },
  {
    id: "kkula",
    title: "Brainwash Presents: Brainwash X Kkula",
    headline: "Brainwash × Kkula",
    lineup: ["Drakk", "HELLBOUND!", "FÜÜLROD", "ÖTAK", "TA$H"],
    date: "2026-07-25",
    venue: "Secret location, Atlanta",
    tags: ["Hard Groove", "Hard Techno", "Industrial"],
    flyerSrc: shotgunFlyer("kulla169_tfawvh.png"),
    ticketsHref: shotgunEvent("brainwash-presents-brainwash-x-kkula"),
  },
  {
    id: "nikolina-kander",
    title: "Brainwash Presents: Nikolina, Kander",
    headline: "Nikolina + Kander",
    lineup: ["Nikolina", "Kander", "PRYTEC", "bkrb0ii"],
    date: "2026-05-16",
    venue: "Underground Atlanta",
    tags: ["Hard Groove", "Industrial", "Hard Techno"],
    flyerSrc: shotgunFlyer("UNDERGROUND_ATLANTA_f5v0kt"),
    ticketsHref: shotgunEvent("brainwash-presents-nikolina-kander"),
  },
  {
    id: "raw-10",
    title: "Raw X Brainwash: Raw 10 Years",
    headline: "Raw 10 Years",
    lineup: ["Fernanda Martins", "Bours b2b The Chronics", "Tigerhead", "GNVR"],
    date: "2026-04-25",
    hours: "10PM–4AM",
    venue: "Underground Atlanta",
    tags: ["Hard Techno", "Hard Groove", "Schranz"],
    flyerSrc: shotgunFlyer("shotgun_cycmu8"),
    ticketsHref: shotgunEvent("raw-x-brainwash-raw-10-years"),
  },
  {
    id: "perpleks",
    title: "Brainwash Presents: Per Pleks",
    headline: "Per Pleks",
    lineup: ["Per Pleks"],
    date: "2026-03-14",
    hours: "10PM–4AM",
    venue: "Secret location, Atlanta",
    tags: ["Techno", "Hard Techno", "German Techno"],
    flyerSrc: "/flyers/perpleksflyer.png",
    ticketsHref: shotgunEvent("brainwash-presents-per-pleks"),
    promoSrc: "/promos/perplekspromo.mp4",
  },
  {
    id: "kloud",
    title: "Brainwash Presents: Kloud",
    headline: "Kloud",
    lineup: ["Kloud"],
    date: "2026-01-23",
    venue: "Atlanta",
    tags: ["Techno", "Hard Techno"],
    flyerSrc: "/flyers/kloudflyer.avif",
    ticketsHref: shotgunEvent("brainwash-presents-kloud"),
    promoSrc: "/promos/kloudpromo.mp4",
  },
  {
    id: "aiden",
    title: "Brainwash Presents: Aiden",
    headline: "Aiden",
    lineup: ["Aiden"],
    date: "2025-12-26",
    venue: "Atlanta",
    tags: ["German Techno", "Hardcore", "Hard Techno"],
    flyerSrc: "/flyers/aidenflyer.avif",
    ticketsHref: SHOTGUN_PAGE,
    gallery: "aiden",
    promoSrc: "/promos/aidenpromo.mp4",
  },
  {
    id: "gioh",
    title: "Brainwash x Domicile: Gioh Cecato",
    headline: "Gioh Cecato",
    lineup: ["Gioh Cecato"],
    date: "2025-10-17",
    venue: "Atlanta",
    tags: ["Hardstyle", "German Techno", "Techno"],
    flyerSrc: "/flyers/giohflyer.png",
    ticketsHref: SHOTGUN_PAGE,
    gallery: "gioh",
  },
  {
    id: "drakk",
    title: "Brainwash Presents: Drakk",
    headline: "Drakk",
    lineup: ["Drakk"],
    date: "2025-08-08",
    venue: "Atlanta",
    tags: ["Techno", "Hard Techno", "Acid Techno"],
    flyerSrc: "/flyers/drakkflyer.png",
    ticketsHref: SHOTGUN_PAGE,
    gallery: "drakk",
  },
  {
    id: "annoluxx",
    title: "Brainwash: Annoluxx",
    headline: "Annoluxx",
    lineup: ["Annoluxx"],
    date: "2025-06-12",
    venue: "Underground Atlanta",
    tags: ["Techno", "EDM", "Acid Techno"],
    flyerSrc: "/flyers/annoluxflyer.png",
    ticketsHref: SHOTGUN_PAGE,
  },
  {
    id: "bw50",
    title: "Brainwash 5.0",
    headline: "Brainwash 5.0",
    lineup: [],
    date: "2025-03-21",
    venue: "Atlanta",
    tags: ["Techno"],
    flyerSrc: "/flyers/bw50flyer.png",
    ticketsHref: SHOTGUN_PAGE,
  },
  {
    id: "black-techno-friday",
    title: "Brainwash: Black Techno Friday",
    headline: "Black Techno Friday",
    lineup: ["Kashmere", "Neataoux", "Tolii", "Yuree"],
    date: "2024-11-29",
    hours: "10PM–3AM",
    venue: "Railroad, Underground Atlanta",
    tags: ["Acid Techno", "Deep Techno", "Hard Techno"],
    flyerSrc: shotgunFlyer("brainwash11_29_24_anldid.png"),
    ticketsHref: shotgunEvent("brainwash-black-techno-friday"),
  },
];

/** Today's date in Atlanta as YYYY-MM-DD */
function todayInAtlanta() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

export function getUpcomingEvents() {
  const today = todayInAtlanta();
  return events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents() {
  const today = todayInAtlanta();
  return events.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
}

const parse = (iso: string) => new Date(`${iso}T12:00:00Z`);

/** "SAT 11.07.26" */
export function shortDate(iso: string) {
  const d = parse(iso);
  const wd = d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }).toUpperCase();
  const [y, m, day] = iso.split("-");
  return `${wd} ${m}.${day}.${y.slice(2)}`;
}

/** "Saturday, November 7, 2026" */
export function longDate(iso: string) {
  return parse(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function uniqueArtistCount() {
  return new Set(events.flatMap((e) => e.lineup.map((a) => a.toLowerCase()))).size;
}
