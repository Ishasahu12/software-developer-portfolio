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

## Composition Offsets
- **Galaxy offset X**: 55 (slightly right of center for visual balance)
- **Galaxy offset Y**: 22 (moved up from 18 for better mobile centering)
- **Galaxy rotation X**: 0.32 (tilt angle)

## Mobile Responsiveness
- **Hero height**: `h-[92vh] sm:min-h-screen` so mobile transitions earlier into the next section
- **Galaxy footprint**: mobile wrapper set to `h-[78vh]` for a slightly larger galaxy presence before the next section
- **Touch scrolling fix**: galaxy wrapper uses `pointer-events-none sm:pointer-events-auto` so finger swipe scroll works even when touching the galaxy on mobile
- **Desktop behavior preserved**: full-height galaxy and pointer interaction remain active from `sm` and up
- **Content anchor**: `items-start sm:items-center` with `pt-32 sm:pt-0` for slightly lower mobile text placement
- **Content padding**: `px-6 sm:px-12 lg:px-16 pb-20 sm:pb-0`

## Color System (Poped Up)
- Background: `#020204` (near-black void)
- Ring 1 (gold): `cr=0.98-1.0, cg=0.94-0.98, cb=0.76-0.86` — full warmth, bright gold
- Ring 2 (white): `cr=0.94-0.98, cg=0.95-0.98, cb=0.93-0.98` — pure white, no dimming
- Ring 3 (blue): `cr=0.50-0.62, cg=0.68-0.80, cb=1.0` — saturated blue, no dimming
- Ring 4 (cyan): `cr=0.44-0.56, cg=0.72-0.84, cb=1.0` — saturated cyan, no dimming
- Core: Bright golden glow with additive blending
- All rings use `colorWarmth: 1.0` for maximum brightness

## File Location
`components/hero/GalaxyCanvas.tsx`
`components/hero/Hero.tsx`
`components/hero/HeroContent.tsx`
