# Bhagvan Singh Lodhi — Portfolio

A premium, cinematic portfolio for a full stack MERN developer emphasizing solo builder authenticity, product thinking, and engineering quality.

## Tech Stack

Next.js 14 · React 18 · Three.js · Framer Motion · Tailwind CSS · TypeScript

## Sections

| Section | Description | File |
|---------|-------------|------|
| **Galaxy Hero** | 3D particle galaxy with GPU physics — full-screen immersive opener | [`components/hero/GalaxyCanvas.tsx`](components/hero/GalaxyCanvas.tsx) |
| **Work** | 4 project cards (Meridian, Aether, Cortex, Forma) with live/GitHub links and stack tags | [`components/sections/Work.tsx`](components/sections/Work.tsx) |
| **Engineering Discipline** | 560+ LeetCode stats + categorized tools grid (Frontend/Backend/Design/Deploy) | [`components/sections/EngineeringDiscipline.tsx`](components/sections/EngineeringDiscipline.tsx) |
| **About** | Bio (4 paragraphs) + floating paper portrait (Three.js GLSL shader) | [`components/sections/About.tsx`](components/sections/About.tsx) · [`components/sections/PixelPortrait.tsx`](components/sections/PixelPortrait.tsx) |
| **Contact** | "Let's build something meaningful." heading, email/GitHub/LinkedIn links, CTA button, footer | [`components/sections/Contact.tsx`](components/sections/Contact.tsx) |

## Design System

- **Background**: `#12120F` (`bg-void`)
- **Accent**: `#DBF241` (lime green)
- **Text**: warm greys (`warm-200`, `warm-300`, `warm-400`, `warm-600`)
- **Fonts**: Poppins (headings) · DM Sans (body)

## Key Files

- [`app/page.tsx`](app/page.tsx) — page composition
- [`app/layout.tsx`](app/layout.tsx) — root layout + fonts + Navbar
- [`tailwind.config.ts`](tailwind.config.ts) — design tokens
- [`docs/`](docs/) — feature documentation

## Run

```bash
npm run dev
npm run build
```