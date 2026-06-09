# Fintegrity — Landing Page

Marketing site for Fintegrity, the embedded compliance-decisioning platform for African fintechs.
Built with Vite + React. Light, Stripe/Wise-inspired design with an interactive decision demo and an ICP use-case section.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, "Add New Project" → import the repo.
3. Vercel auto-detects Vite (build: `npm run build`, output: `dist`). Just click Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Edit content

- Copy, hero, pillars, and the ICP use-case data live in `src/App.jsx` (see the `ICP` and `DECISIONS` objects at the top).
- Design tokens (colors, spacing) live at the top of `src/styles.css` under `:root`.
- Replace the placeholder email `hello@fintegrity.africa` in `src/App.jsx` with your real contact address.

## Notes

This site presents Fintegrity as an early-stage platform seeking design partners. It intentionally avoids fake customer logos or invented metrics. Regulatory figures reflect current CBN / NFIU / MLPPA 2022 guidance and are not legal advice.
