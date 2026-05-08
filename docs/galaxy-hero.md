# Galaxy Hero Section

## Feature Overview
An immersive 3D galactic visualization serving as the portfolio's hero section. Features a GPU-driven particle system with 4 concentric orbital rings, magnetic cursor interaction, and cinematic scroll zoom.

## Technical Implementation

### Core Technology
- **Three.js** (pure, not R3F) for WebGL rendering
- **Custom GLSL shaders** for GPU-driven particle physics
- **Framer Motion** for scroll-based camera interpolation

### Architecture
- `GalaxyCanvas.tsx` — Main galaxy engine (LOCKED)
- `GalaxyCanvas.LOCKED.tsx` — Backup at lock state
- `Hero.tsx` — Container section
- `HeroContent.tsx` — Text overlay with animations

### Key Constants
```
RING_1_RADIUS: 55
RING_2_RADIUS: 72  
RING_3_RADIUS: 88
RING_4_RADIUS: 102
PARTICLE_COUNT: ~196,000
CORE_RADIUS: 15
SCROLL_ZOOM_RANGE: [260, 2] (Z axis)
FOV_RANGE: [70, 42] (degrees)
ROTATION_SPEED: 0.32
```

### Interactions
- **Scroll zoom**: Double exponential lerp from z=260 to z=2
- **Magnetic repulsion**: Particles repel from cursor within 90-unit radius
- **Orbit rotation**: `points.rotation.y += dt * 0.32` per frame
- **Adaptive DPR**: Drops to 1.0 if FPS < 42, restores at FPS > 58

### Color System
- Background: `#020204` (near-black void)
- Star colors: Warm whites, golds, pale oranges
- Core: Bright golden glow with additive blending
- Accent ring: Subtle golden inner ring

### Lock Status
**LOCKED** — Do not modify `GalaxyCanvas.tsx`. Use backup file for experiments.

## Dependencies
- `three: ^0.163.0`
- `framer-motion: ^11.1.0`
- Next.js 14 App Router

## Mobile Responsiveness
- **Container**: `h-screen` full viewport, no additional top padding
- **Content anchor**: `items-end sm:items-center` — content pinned to bottom on mobile, centered on larger screens
- **Content padding**: `px-6 sm:px-12 lg:px-16 pb-16 sm:pb-0` — reduced horizontal padding on mobile, bottom padding to clear nav
- **Subheading**: `text-[11px] sm:text-xs`, reduced tracking on mobile
- **Heading**: `text-5xl sm:text-6xl lg:text-[5.5rem]` — scales down significantly on mobile for readability
- **Body text**: `text-sm sm:text-base`, max-width `max-w-sm` on all screens
- **CTA button**: `px-7 py-3.5` — compact on mobile
- **Galaxy canvas**: Fills entire viewport behind content

## File Location
`components/hero/GalaxyCanvas.tsx`
`components/hero/Hero.tsx`
`components/hero/HeroContent.tsx`
