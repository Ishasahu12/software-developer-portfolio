# Work Section

## Feature Overview
A premium project showcase section presenting 4 independently built products with clean project cards. Displays project title, one-line description, tech stack, and links to live preview and GitHub.

## Design Philosophy
- Solo builder positioning — no fake team or startup language
- Focus on product thinking, UX, and engineering quality
- Premium card design with subtle hover interactions
- Authentic presentation of independent work

## Sections
- **Hero** — Title "Selected Work" with no intro paragraph
- **Project Cards** — 2-column grid on desktop, stacked on mobile

## Project Card Structure
```
title: string
description: string (one-liner about what it does)
stack: string[] (tech tags)
live: string (live preview URL)
github: string (GitHub repo URL)
```

## Projects Included
1. **Meridian** — Supply chain visibility tool (Next.js, TypeScript, Node.js, MongoDB, Tailwind)
2. **Aether** — Markdown note-taking app (React, TypeScript, IndexedDB, Zustand, Tailwind)
3. **Cortex** — Component design system (TypeScript, Storybook, Radix UI, CSS Variables, Vite)
4. **Forma** — AI form builder (React, OpenAI API, Express, PostgreSQL, Framer Motion)

## Interactions
- Hover: Card elevates slightly, border lightens
- Live/GitHub links: Subtle arrow icon animation on hover
- Scroll-triggered staggered entrance

## Design Tokens
- Card padding: `p-8 sm:p-10`
- Card gap: `gap-6 lg:gap-8`
- Border: `border-white/[0.06]` → hover `border-white/[0.1]`
- Background: `bg-white/[0.02]` → hover `bg-white/[0.04]`

## Mobile Responsiveness
- **Section padding**: `py-14 sm:py-32 lg:py-44` — tighter mobile spacing for faster section entry
- **Container padding**: `px-8 sm:px-12 lg:px-16` — reduced horizontal padding on mobile
- **Section heading**: `text-3xl sm:text-5xl` — smaller on mobile
- **Heading margin**: `mb-12 lg:mb-20` — tighter on mobile
- **Card gap**: `gap-6 lg:gap-8` — tighter on mobile
- **Card layout**: `grid-cols-1 md:grid-cols-2` — single column on mobile
- **Card padding**: `p-8 sm:p-10` — compact on mobile
- **Stack tags**: `flex-wrap gap-2` — wraps naturally
- **Link row**: `gap-6` — tighter spacing

## File Location
`components/sections/Work.tsx`
