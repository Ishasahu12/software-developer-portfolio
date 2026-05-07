# Portfolio Context & Documentation

This document serves as the authoritative reference for the Bhagvan Singh Lodhi portfolio project. All feature documentation is maintained in the `/docs` directory. This file should be updated as new features are added or existing ones are modified.

---

## Project Overview

**Owner**: Bhagvan Singh Lodhi  
**Tech Stack**: Next.js 14, React 18, Three.js, Framer Motion, Tailwind CSS, TypeScript  
**Repository**: https://github.com/Ishasahu12/software-developer-portfolio

### Portfolio Positioning
A premium, cinematic portfolio for a full stack MERN developer emphasizing:
- Solo builder authenticity
- Product thinking and engineering quality
- Clean architecture and modern frontend systems
- AI-assisted development workflow

### Color System
| Token | Value | Usage |
|-------|-------|-------|
| `bg-void` | `#12120F` | Primary background |
| `accent` | `#DBF241` | Primary accent (lime green) |
| `warm-200` | `#E8E6E1` | Headings |
| `warm-300` | `#A09B8C` | Body text |
| `warm-400` | `#6B665C` | Muted text |
| `warm-600` | `#3D3A33` | Labels/tags |

---

## Feature Documentation

### Core Sections

| Section | Documentation | Description |
|---------|--------------|-------------|
| **Galaxy Hero** | [`docs/galaxy-hero.md`](docs/galaxy-hero.md) | 3D particle galaxy with GPU physics |
| **Work** | [`docs/work-section.md`](docs/work-section.md) | Project showcase with 4 products |
| **Engineering Discipline** | [`docs/engineering-discipline.md`](docs/engineering-discipline.md) | LeetCode stats + tools grid |
| **About** | [`docs/about-section.md`](docs/about-section.md) | Bio + floating paper portrait |
| **Contact** | [`docs/contact-section.md`](docs/contact-section.md) | Social links + CTA + footer |

---

## Agent Instructions

When working on this portfolio, you MUST:

### 1. Reference Documentation
Before modifying any feature, read the relevant doc file to understand:
- Current implementation details
- Design tokens and spacing
- Interaction behaviors
- Lock status (some files are immutable)

### 2. Maintain Documentation
After any feature modification:
1. Update the relevant doc file in `/docs`
2. Document what changed, why, and key decisions
3. Update this `Agents.md` file if adding new sections or patterns

### 3. Galaxy Protection
**CRITICAL**: The `GalaxyCanvas.tsx` file is LOCKED. Do not modify it under any circumstances. Use `GalaxyCanvas.LOCKED.tsx` for experiments.

### 4. Build Verification
Run `npm run build` after every change. The build must pass before considering a task complete.

### 5. Responsive Design
All sections must be tested at:
- Mobile (default Tailwind breakpoints)
- Tablet (`sm:`)
- Desktop (`lg:`)

### 6. Authenticity Standards
The portfolio must NOT:
- Use fake company names or team language
- Exaggerate impact or use false metrics
- Present as having work experience when a student
- Copy startup-bro or bootcamp portfolio aesthetics

The portfolio SHOULD:
- Present solo builder work honestly
- Emphasize product thinking and engineering quality
- Show discipline (560+ LeetCode problems)
- Communicate high potential and capability

---

## Key Files

| File | Purpose | Status |
|------|---------|--------|
| `components/hero/GalaxyCanvas.tsx` | Galaxy engine | **LOCKED** |
| `components/hero/GalaxyCanvas.LOCKED.tsx` | Galaxy backup | Safe to modify |
| `components/hero/Hero.tsx` | Hero container | Active |
| `components/hero/HeroContent.tsx` | Hero text overlay | Active |
| `components/Navbar.tsx` | Navigation | Active |
| `components/sections/Work.tsx` | Projects | Active |
| `components/sections/EngineeringDiscipline.tsx` | Stats + Tools | Active |
| `components/sections/About.tsx` | Bio + Portrait | Active |
| `components/sections/PixelPortrait.tsx` | 3D portrait | Active |
| `components/sections/Contact.tsx` | Contact + Footer | Active |
| `app/page.tsx` | Main page | Active |
| `app/layout.tsx` | Root layout + fonts | Active |
| `tailwind.config.ts` | Design tokens | Active |

---

## Documentation Update Log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-07 | Initial documentation created for all 5 sections | opencode |
