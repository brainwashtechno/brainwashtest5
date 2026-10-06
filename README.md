# Brainwash — brainwash.live

Next.js site for Brainwash, Atlanta underground techno. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Common edits

- **Add an event:** add an entry at the top of `data/events.ts`. Upcoming vs past is worked out from the date, and the homepage "Next up" picks the soonest upcoming one.
- **Socials, email, genres in the red strip:** `data/site.ts`.
- **Gallery photo sets:** `data/gallery.ts` (photos live in `public/media/<event>/`).
- **Colors and fonts:** top of `app/globals.css` and `app/layout.tsx`.
