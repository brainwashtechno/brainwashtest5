export type EventItem = {
  id: string;
  title: string;
  dateLabel: string;
  city: string;
  tags: string[];
  flyerSrc: string;
  ticketsHref: string;
  recapHref?: string; // link to gallery tab
  kind: "upcoming" | "past";
};

export const SHOTGUN_VENUE = "https://shotgun.live/en/events/brainwash-presents-per-pleks";
export const SHOTGUN_PAGE = "https://shotgun.live/en/venues/brainwash";

export const upcomingEvent: EventItem = {
  id: "perpleks",
  title: "Brainwash Presents: Per Pleks",
  dateLabel: "Fri, Mar 13, 2026 (10PM–4AM)",
  city: "Atlanta",
  tags: ["Techno", "Hard Techno"],
  flyerSrc: "/flyers/perpleksflyer.png",
  ticketsHref: SHOTGUN_VENUE,
  kind: "upcoming",
};

export const pastEvents: EventItem[] = [
  {
    id: "kloud",
    title: "Brainwash Presents: Kloud",
    dateLabel: "Fri, Jan 23, 2026",
    city: "Atlanta",
    tags: ["Techno", "Hard Techno"],
    flyerSrc: "/flyers/kloudflyer.avif",
    ticketsHref: SHOTGUN_PAGE,
    kind: "past",
  },
  {
    id: "aiden",
    title: "Brainwash Presents: Aiden",
    dateLabel: "Fri, Dec 26, 2025",
    city: "Atlanta",
    tags: ["German Techno", "Hardcore", "Hard Techno"],
    flyerSrc: "/flyers/aidenflyer.avif",
    ticketsHref: SHOTGUN_PAGE,
    recapHref: "/gallery?event=aiden",
    kind: "past",
  },
  {
    id: "gioh",
    title: "Brainwash x Domicile: Gioh Cecato",
    dateLabel: "Fri, Oct 17, 2025",
    city: "Atlanta",
    tags: ["Hardstyle", "German Techno", "Techno"],
    flyerSrc: "/flyers/giohflyer.png",
    ticketsHref: SHOTGUN_PAGE,
    recapHref: "/gallery?event=gioh",
    kind: "past",
  },
  {
    id: "drakk",
    title: "Brainwash Presents: Drakk",
    dateLabel: "Fri, Aug 8, 2025",
    city: "Atlanta",
    tags: ["Techno", "Hard Techno", "Acid Techno"],
    flyerSrc: "/flyers/drakkflyer.png",
    ticketsHref: SHOTGUN_PAGE,
    recapHref: "/gallery?event=drakk",
    kind: "past",
  },
  {
    id: "annoluxx",
    title: "Brainwash: Annoluxx",
    dateLabel: "Thu, Jun 12, 2025",
    city: "Underground Atlanta",
    tags: ["Techno", "EDM", "Acid Techno"],
    flyerSrc: "/flyers/annoluxflyer.png",
    ticketsHref: SHOTGUN_PAGE,
    kind: "past",
  },
  {
    id: "bw50",
    title: "Brainwash 5.0",
    dateLabel: "Fri, Mar 21, 2025",
    city: "Atlanta",
    tags: ["Techno"],
    flyerSrc: "/flyers/bw50flyer.png",
    ticketsHref: SHOTGUN_PAGE,
    kind: "past",
  },
];
