# About Section

## Feature Overview
A two-column layout with an interactive floating paper portrait on the left and personal bio text on the right. The portrait features a subtle 3D wave effect on hover. Section heading is "About me".

## Layout Structure (Desktop)
```
[Left col — 4/12]     [Right col — 8/12]
"About me" heading     Text content
Portrait image        (aligned with portrait top)
```

## Mobile Layout
- Stacked: Portrait above, text below
- Portrait: `max-w-[180px] sm:max-w-[220px]` — smaller on mobile
- Section padding: `py-20 sm:py-32 lg:py-44` — compact on mobile
- Grid gap: `gap-8 lg:gap-12` — tighter on mobile
- Text top alignment offset: `sm:pt-[88px]` — only on tablet+

## Left Column Elements
1. Section heading: "About me" (Poppins, 3xl/5xl)
2. PixelPortrait component (Three.js shader-based)

## About Text Content
Four paragraphs covering:
1. Identity statement — MERN developer with focus on performance/architecture
2. AI-powered development workflow + independent product building
3. Current exploration areas — scalable backend, cloud, AI-assisted workflows
4. Personal interests — iHaveNoTV documentaries, history, solar system/space

## Portrait Component — Floating Paper Effect

### Technical Implementation
- **Three.js ShaderMaterial** with custom vertex shader
- **18×24 subdivided plane** for smooth vertex displacement
- **GLSL vertex shader** with multiple sine wave layers

### Shader Details
```glsl
// 3 wave layers for organic paper feel
wave1 = sin(pos.x * 3.0 + uTime * 1.2) * 0.03;
wave2 = sin(pos.y * 2.5 + uTime * 0.9) * 0.025;
wave3 = sin((pos.x + pos.y) * 4.0 + uTime * 1.5) * 0.015;

// Mouse influence (subtle)
mouseWave = sin(dist * 10.0 - uTime * 2.0) * 0.04 * uHover;
hoverRipple = sin(dist * 15.0 - uTime * 3.0) * 0.02 * uHover;
```

### Image Treatment
- Right-side crop focusing on face position
- No tone mapping (`THREE.NoToneMapping`)
- Flat color rendering (`flat` prop on Canvas)
- Image size: `max-w-[220px] sm:max-w-[260px]`

### Color Settings
- Canvas `toneMapping: THREE.NoToneMapping`
- Canvas `toneMappingExposure: 1`
- No desaturation (colors as-is from image)

## Design Tokens
- Grid gap: `gap-8 lg:gap-12`
- About text paragraphs: `mb-6 sm:mb-8`
- Portrait rounded container: `rounded-2xl border border-white/[0.08]`

## File Locations
- `components/sections/About.tsx`
- `components/sections/PixelPortrait.tsx`
- `public/about-portrait.png` (copied from `Image About section.png`)
