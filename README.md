# AndiumClient — Landing Page

A modern, heavily animated landing page for **AndiumClient**, a Minecraft client.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**, plus shadcn-style primitives, Lucide icons and Lenis for premium smooth-scroll.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS with a custom dark theme and neon accents
- Framer Motion for all motion (no CSS keyframes where avoidable)
- @studio-freight/lenis for premium smooth scrolling
- @radix-ui (Accordion + Slot) — shadcn-style primitives
- lucide-react for icons
- Inter (body) + Space Grotesk (display) via `next/font`

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

To build for production:

```bash
npm run build
npm run start
```

## Folder layout

```
app/                Root layout, page entry, globals.css
components/         Generic + shadcn-style primitives (button, accordion, SmoothScroll)
sections/           Page sections (Hero, Features, Showcase, Stats, Download, FAQ, Footer)
lib/                utils (cn, easing constant)
public/             Static assets
```

## Theming

Theme colors live as HSL CSS variables in `app/globals.css` and are exposed to Tailwind via `tailwind.config.ts`. Tweak `--accent-blue` / `--accent-purple` / `--bg` to re-skin the entire site.

## Notes

- All page sections use `whileInView` with `viewport={{ once: true, margin: '-80px' }}` for reveal-on-scroll, plus stagger via parent variants.
- Custom easing is `[0.22, 1, 0.36, 1]`, exported as `EASE` from `lib/utils.ts`.
- Floating cubes and the particle field in the Hero use deterministic pseudo-random so SSR markup matches client.
- The Showcase parallax is driven by `useScroll` + `useSpring` for smoothed scroll-linked transforms.
- The Stats counters use `useInView` to fire once when scrolled into view.
- The Navbar's backdrop blur intensifies past 24px of scroll.

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`).
- Visible focus styles via `focus-visible:ring-accent-blue`.
- ARIA labels on icon-only controls (mobile menu, social links).
- Reduced-motion users still get usable content — Framer Motion respects `prefers-reduced-motion` for our `whileInView` reveals.

## License

Demo / educational. Not affiliated with Mojang or Microsoft.
